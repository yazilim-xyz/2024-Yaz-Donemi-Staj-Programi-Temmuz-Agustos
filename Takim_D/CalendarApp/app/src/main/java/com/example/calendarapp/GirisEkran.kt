package com.example.calendarapp

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GirisEkran(navController: NavController) {

    val image: Painter = painterResource(id = R.drawable.arkaplann)
    var posta by remember { mutableStateOf("") }
    var sifre by rememberSaveable { mutableStateOf("") }
    var errorMesage by remember { mutableStateOf("") }
    var passwordVisibility by remember { mutableStateOf(false) }

    val auth: FirebaseAuth = FirebaseAuth.getInstance()
    val icon = if (passwordVisibility) painterResource(id = R.drawable.baseline_visibility_24)
    else painterResource(id = R.drawable.baseline_visibility_off_24)
    val customColor = Color(android.graphics.Color.parseColor("#6771E0"))

    Box(
        modifier = Modifier
            .fillMaxSize()
    ) {
        Image(
            painter = image,
            contentDescription = null,
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {

            Spacer(modifier = Modifier.height(230.dp)) // Burada boşluk ekliyoruz

            Text(
                text = "Giriş Yap",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(bottom = 20.dp)
            )

            OutlinedTextField(
                value = posta,
                onValueChange = {
                    if (it.length <= 30) {
                        posta = it
                        errorMesage = ""
                    }
                },
                label = { Text("Posta") },
                isError = errorMesage.isNotEmpty(),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 30.dp, vertical = 8.dp)
            )

            OutlinedTextField(
                value = sifre,
                onValueChange = {
                    if (it.length <= 30) {
                        sifre = it
                        errorMesage = ""
                    }
                },
                placeholder = { Text(text = "Şifre") },
                label = { Text(text = "Şifre") },
                isError = errorMesage.isNotEmpty(),
                trailingIcon = {
                    IconButton(onClick = {
                        passwordVisibility = !passwordVisibility
                    }) {
                        Icon(painter = icon, contentDescription = "visibility icon")
                    }
                },
                visualTransformation = if (passwordVisibility) VisualTransformation.None else PasswordVisualTransformation(),
                singleLine = true,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 30.dp, vertical = 8.dp)
            )

            Button(
                onClick = {
                    auth.signInWithEmailAndPassword(posta, sifre)
                        .addOnCompleteListener { task ->
                            if (task.isSuccessful) {
                                val user: FirebaseUser? = auth.currentUser
                                navController.navigate("takvim sayfa")
                            } else {
                                errorMesage = "Geçersiz e-posta adresi veya şifre lütfen tekrar deneyiniz."
                            }
                        }
                },
                colors = ButtonDefaults.buttonColors(
                    containerColor = customColor,
                    contentColor = Color.White
                ),
                modifier = Modifier.padding(16.dp)
            ) {
                Text(text = "Kullanıcı Girişi")
            }

            if (errorMesage.isNotEmpty()) {
                Text(
                    text = errorMesage,
                    color = MaterialTheme.colorScheme.error,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.padding(8.dp)
                )
            }

            TextButton(onClick = { navController.navigate("panel giris") }) {
                Text(
                    text = "Yetki vermek mi istiyorsunuz?",
                    modifier = Modifier.padding(30.dp),
                    textAlign = TextAlign.Center,
                    fontSize = 15.sp,
                    color = Color.Black
                )
            }
        }
    }
}
