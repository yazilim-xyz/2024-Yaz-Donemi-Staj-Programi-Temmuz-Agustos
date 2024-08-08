package com.example.calendarapp

import android.annotation.SuppressLint
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import java.time.*
import java.time.format.DateTimeFormatter
import java.time.format.TextStyle
import java.util.*

import com.google.firebase.firestore.FirebaseFirestore


val db = FirebaseFirestore.getInstance()

@SuppressLint("MutableCollectionMutableState", "UnusedMaterial3ScaffoldPaddingParameter")
@RequiresApi(Build.VERSION_CODES.O)
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TakvimSayfa(navController: NavController) {
    var selectedDate by remember { mutableStateOf<LocalDate?>(null) }
    var notesMap by remember { mutableStateOf(mutableMapOf<LocalDate, Pair<String, LocalDateTime>>()) }
    var newNote by remember { mutableStateOf("") }

    // Uygulama açıldığında notları yükleyin
    LaunchedEffect(Unit) {
        loadNotes { notes ->
            notesMap = notes.toMutableMap()
        }
    }

    Scaffold(
        content = {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp)
                    .background(Color(0xFFF5F5F5))
            ) {
                CalendarView(
                    onDateSelected = { date ->
                        selectedDate = date
                        newNote = notesMap[date]?.first ?: "" // Display the note if it exists
                    },
                    notesMap = notesMap
                )

                Spacer(modifier = Modifier.height(16.dp))

                selectedDate?.let { date ->
                    Text(
                        text = "Add Note for ${date.format(DateTimeFormatter.ofPattern("MMM d, yyyy"))}",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF6200EE)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    TextField(
                        value = newNote,
                        onValueChange = { newNote = it },
                        placeholder = { Text("Enter your note here") },
                        modifier = Modifier.fillMaxWidth(),
                        colors = TextFieldDefaults.textFieldColors(
                            containerColor = Color.White,
                            focusedIndicatorColor = Color(0xFF6200EE),
                            unfocusedIndicatorColor = Color.Gray
                        )
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    Button(
                        onClick = {
                            selectedDate?.let { date ->
                                val note = Pair(newNote, LocalDateTime.now())
                                notesMap = notesMap.toMutableMap().apply { this[date] = note }
                                saveNoteToFirebase(date, note) // Notu Firestore'a kaydet
                                newNote = ""
                            }
                        },
                        modifier = Modifier.align(Alignment.End),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF6200EE))
                    ) {
                        Text("Save Note", color = Color.White)
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    val note = notesMap[date]
                    note?.let {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(8.dp))
                                .background(Color(0xFFBBDEFB))
                                .padding(16.dp)
                        ) {
                            Column {
                                Row(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(end = 16.dp),
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(
                                        text = it.first,
                                        color = Color.Black,
                                        fontSize = 16.sp,
                                        fontWeight = FontWeight.Normal
                                    )
                                    IconButton(onClick = {
                                        selectedDate?.let { date ->
                                            notesMap = notesMap.toMutableMap().apply { remove(date) }
                                            deleteNoteFromFirebase(date) // Notu Firestore'dan sil
                                            newNote = ""
                                        }
                                    }) {
                                        Icon(
                                            imageVector = Icons.Default.Delete,
                                            contentDescription = "Delete Note",
                                            tint = Color.White
                                        )
                                    }
                                }
                                Spacer(modifier = Modifier.height(8.dp))
                                Text(
                                    text = "Saved at: ${it.second.format(DateTimeFormatter.ofPattern("HH:mm:ss"))}",
                                    color = Color.Gray,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Light
                                )
                            }
                        }
                    }
                }
            }
        }
    )
}

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun CalendarView(
    onDateSelected: (LocalDate) -> Unit,
    notesMap: Map<LocalDate, Pair<String, LocalDateTime>>
) {
    val currentMonth = YearMonth.now()
    val currentDate = LocalDate.now()
    val daysOfWeek = DayOfWeek.values()

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color.White)
            .padding(16.dp)
            .clip(RoundedCornerShape(8.dp))
            .shadow(elevation = 4.dp)
    ) {
        Text(
            text = currentMonth.month.getDisplayName(TextStyle.FULL, Locale.getDefault()),
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF6200EE),
            modifier = Modifier.padding(bottom = 16.dp)
        )

        // Days of week header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            daysOfWeek.forEach { dayOfWeek ->
                Text(
                    text = dayOfWeek.getDisplayName(TextStyle.SHORT, Locale.getDefault()),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.Gray,
                    modifier = Modifier.weight(1f),
                    textAlign = TextAlign.Center
                )
            }
        }

        // Calendar grid
        CalendarGrid(
            currentMonth = currentMonth,
            currentDate = currentDate,
            notesMap = notesMap,
            onDateSelected = onDateSelected
        )
    }
}

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun CalendarGrid(
    currentMonth: YearMonth,
    currentDate: LocalDate,
    notesMap: Map<LocalDate, Pair<String, LocalDateTime>>,
    onDateSelected: (LocalDate) -> Unit
) {
    val daysInMonth = currentMonth.lengthOfMonth()
    val firstDayOfMonth = currentMonth.atDay(1).dayOfWeek.value
    val totalWeeks = (daysInMonth + firstDayOfMonth - 1) / 7 + 1

    Column {
        for (week in 0 until totalWeeks) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                for (dayOfWeek in 1..7) {
                    val dayOfMonth = week * 7 + dayOfWeek - firstDayOfMonth + 1
                    if (dayOfMonth in 1..daysInMonth) {
                        val date = currentMonth.atDay(dayOfMonth)
                        DayCell(
                            dayOfMonth = dayOfMonth,
                            isToday = currentDate == date,
                            isSelected = false, // This will be set in CalendarView
                            hasNote = notesMap.containsKey(date),
                            onClick = { onDateSelected(date) }
                        )
                    } else {
                        Spacer(modifier = Modifier.width(32.dp))
                    }
                }
            }
        }
    }
}

@Composable
fun DayCell(dayOfMonth: Int, isToday: Boolean, isSelected: Boolean, hasNote: Boolean, onClick: () -> Unit) {
    val backgroundColor = when {
        isToday -> Color(0xFF03DAC6)
        hasNote -> Color(0xFFFFD600)
        isSelected -> Color(0xFF6200EE)
        else -> Color.Transparent
    }

    val textColor = when {
        isToday || hasNote || isSelected -> Color.White
        else -> Color.Black
    }

    Box(
        modifier = Modifier
            .size(40.dp)
            .background(backgroundColor, shape = CircleShape)
            .clickable { onClick() }
            .padding(4.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = dayOfMonth.toString(),
            color = textColor,
            fontSize = 14.sp,
            fontWeight = if (isToday) FontWeight.Bold else FontWeight.Normal
        )
    }
}

// Notu Firestore'a kaydetme fonksiyonu
private fun saveNoteToFirebase(date: LocalDate, note: Pair<String, LocalDateTime>) {
    val noteData = hashMapOf(
        "note" to note.first,
        "timestamp" to note.second
    )
    db.collection("notes").document(date.toString())
        .set(noteData)
        .addOnSuccessListener {
            // Başarılı kaydetme işlemi
            println("Note saved successfully")
        }
        .addOnFailureListener { e ->
            // Kaydetme hatası
            println("Error saving note: ${e.message}")
        }
}

@RequiresApi(Build.VERSION_CODES.O)
private fun loadNotes(onNotesLoaded: (Map<LocalDate, Pair<String, LocalDateTime>>) -> Unit) {
    db.collection("notes")
        .get()
        .addOnSuccessListener { result ->
            val notes = mutableMapOf<LocalDate, Pair<String, LocalDateTime>>()
            for (document in result) {
                val date = LocalDate.parse(document.id)
                val note = document.getString("note") ?: ""
                val timestamp = document.getTimestamp("timestamp")?.toDate()?.toInstant()?.atZone(ZoneId.systemDefault())?.toLocalDateTime() ?: LocalDateTime.now()
                notes[date] = Pair(note, timestamp)
            }
            onNotesLoaded(notes)
        }
        .addOnFailureListener { e ->
            // Yükleme hatası
            println("Error loading notes: ${e.message}")
        }
}

// Notu Firestore'dan silme fonksiyonu
private fun deleteNoteFromFirebase(date: LocalDate) {
    db.collection("notes").document(date.toString())
        .delete()
        .addOnSuccessListener {
            // Başarılı silme işlemi
            println("Note deleted successfully")
        }
        .addOnFailureListener { e ->
            // Silme hatası
            println("Error deleting note: ${e.message}")
        }
}