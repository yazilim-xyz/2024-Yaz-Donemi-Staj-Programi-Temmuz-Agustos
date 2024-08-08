package com.example.calendarapp.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.google.firebase.firestore.FirebaseFirestore

class UserViewModel  : ViewModel(){
    private val _userList = MutableLiveData<List<User>>()
    val userList: LiveData<List<User>> get() = _userList

    init {
        fetchUsers()
    }

    private fun fetchUsers() {
        val db = FirebaseFirestore.getInstance()
        db.collection("Users").get()
            .addOnSuccessListener { result ->
                val users = result.map { document ->
                    User(
                        email = document.getString("email") ?: "",
                        name = document.getString("name") ?: ""
                    )
                }
                _userList.value = users
            }
            .addOnFailureListener { exception ->
                // Handle error
            }
    }
}

data class User(
    val email: String,
    val name: String
)
