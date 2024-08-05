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

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GirisEkran(navController: NavController) {

    val image: Painter = painterResource(id = R.drawable.arkaplann)
    var posta by remember {
        mutableStateOf("")
    }
    var sifre by rememberSaveable {
        mutableStateOf("")
    }

    var errorMesage by remember {
        mutableStateOf("")
    }
    var passwordVisibility by remember {
        mutableStateOf(false)
    }

    val icon = if (passwordVisibility)
        painterResource(id = R.drawable.baseline_visibility_24)
    else
        painterResource(id = R.drawable.baseline_visibility_off_24)

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
            verticalArrangement = Arrangement.Top,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {

            Spacer(modifier = Modifier.height(250.dp)) // Burada boşluk ekliyoruz

            Text(text = "", fontSize = 20.sp , fontWeight = FontWeight.Bold)

            Spacer(modifier = Modifier.height(20.dp))

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

            Spacer(modifier = Modifier.height(20.dp))

            Row(
                horizontalArrangement = Arrangement.spacedBy(20.dp)
            ) {
                Button(
                    onClick = {
                        val specialCharacters = "!@#$%^&*(),.?\":{}|<>"
                        val containsSpecialCharacter = specialCharacters.any { it in sifre }
                        if (posta.contains("@") && containsSpecialCharacter) {
                            navController.navigate("takvim sayfa")
                        } else {
                            errorMesage = "Geçersiz e-posta adresi veya şifre lütfen şifrenizin özel karakter içermesine dikkat edin."
                        }
                    },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = customColor,
                        contentColor = Color.White
                    )
                ) {
                    Text(text = "Kullanıcı Girişi")
                }
            }

            if (errorMesage.isNotEmpty()) {
                Text(
                    errorMesage,
                    color = MaterialTheme.colorScheme.error,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.padding(8.dp)
                )
            }

            TextButton(onClick = { navController.navigate("panel giris") }) {
                Text(
                    text = "Yetki vermek mi istiyorsunuz ?",
                    modifier = Modifier.padding(30.dp),
                    textAlign = TextAlign.Center,
                    fontSize = 15.sp,
                    color = Color.Black
                )
            }
        }
    }
}
