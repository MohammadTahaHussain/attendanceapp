import { auth, db, storage } from "../configs/firebase.config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import {
  ref,
  getDownloadURL,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

// Regex
let re =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Declaring Inputs of Login
let inpEmail = document.getElementById("input-email-login");
let inpPassword = document.getElementById("input-password-login");
let signInBtn = document.getElementById("login-btn");

// SignIn Function
function signIn() {
  if (re.test(inpEmail.value)) {
    signInWithEmailAndPassword(auth, inpEmail.value, inpPassword.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        location = "../admin/index.html";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  } else {
    console.log("Enter a valid Email address Pls");
  }
}
if (signInBtn) {
  signInBtn.addEventListener("click", signIn);
}

// Js of Class.html

let addClassBtn = document.getElementById("add-class");
let inpCourseName = document.getElementById("inp-course-name");
let inpTeacherName = document.getElementById("inp-teacher-name");
let inpBatchName = document.getElementById("inp-batch-name");
let inpSecName = document.getElementById("inp-sec-name");
let inpClassStartTime = document.getElementById("inp-start-time");
let inpClassEndTime = document.getElementById("inp-end-time");
let inpClassSchedule = document.getElementById("inp-schedule");

if (addClassBtn) {
  addClassBtn.addEventListener("click", async () => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "classes"), {
        courseName: inpCourseName.value,
        teacherName: inpTeacherName.value,
        BatchNo: inpBatchName.value,
        secNo: inpSecName.value,
        classStartTime: inpClassStartTime.value,
        classEndTime: inpClassEndTime.value,
        classDays: inpClassSchedule.value,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });
}

// js of addstudent.html

let selectCourse = document.getElementById("select-courses");
let selectSir = document.getElementById("select-sir");

let addStudentbtn = document.getElementById("add-student");
let inpStName = document.getElementById("inp-student-name");
let inpFatherName = document.getElementById("inp-father-name");
let inpRollNo = document.getElementById("inp-roll-no");
let inpContactNo = document.getElementById("inp-contact-no");
let inpCnicNo = document.getElementById("inp-cnic");
let inpStPic = document.getElementById("inp-pic");
let userImageUrl;

// fetching data in select of ad student

if(location.pathname == "/admin/addstudent.html"){
  const q = query(collection(db, "classes"));
onSnapshot(q, (querySnapshot) => {
  selectCourse.innerHTML = "";
  querySnapshot.forEach((doc) => {
    selectCourse.innerHTML += ` <option value="${doc.data().courseName}">${
      doc.data().courseName
    }</option>`;
  });
  selectedSir();
});
function selectedSir() {
  // let selectedSir = selectSir.options[selectSir.selectedIndex].value;
  let selectedCourse = selectCourse.options[selectCourse.selectedIndex].value;
  let condition =
    (where("teacherName", "==", selectedSir),
    where("courseName", "==", selectedCourse));
  const q2 = query(collection(db, "classes"), condition);
  onSnapshot(q2, (querySnapshot) => {
    selectSir.innerHTML = "";
    querySnapshot.forEach((doc) => {
      selectSir.innerHTML += ` <option value="${doc.data().teacherName}">${
        doc.data().teacherName
      }</option>`;
    });
  });
}

if (addStudentbtn) {
  addStudentbtn.addEventListener("click", async () => {
    event.preventDefault();
    let selectedCourse = selectCourse.options[selectCourse.selectedIndex].value;
    let selectedSir = selectSir.options[selectSir.selectedIndex].value;
    try {
      await addDoc(collection(db, "students"), {
        studentName: inpStName.value,
        fatherName: inpFatherName.value,
        rollNo: inpRollNo.value,
        contactNo: inpContactNo.value,
        cnic: inpCnicNo.value,
        course: selectedCourse,
        teacherName: selectedSir,
      });

      inpStName.value = ""
      inpFatherName.value= ""
      inpRollNo.value = ""
      inpContactNo.value = ""
      inpCnicNo.value = ""

    } catch (e) {
      console.log(e);
    }
  });
}

window.selectedSir = selectedSir;
}



// Class.js 
let tBody = document.getElementById("st-tbody")
if(location.pathname == "/admin/allstudents.html" || location.pathname == "/admin/allstudents.html/#"){
  
function allStudents(){
  const q = query(collection(db, "students"));
   onSnapshot(q, (querySnapshot) => {
    tBody.innerHTML = ""
  querySnapshot.forEach((doc) => {
    tBody.innerHTML += `<tr
    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
      ${doc.data().studentName}
    </th>
    <td class="px-6 py-4">
      ${doc.data().teacherName}
    </td>
    <td class="px-6 py-4">
      ${doc.data().course}
    </td>
    <td class="px-6 py-4">
      ${doc.data().rollNo}
    </td>
    <td class="px-6 py-4 text-right">
      <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onclick="modalHandler(true) , modalShow(), edit('${doc.id}','${doc.data().teacherName}' , '${doc.data().course}', '${doc.data().rollNo}') ">Edit</a>
    </td>
  </tr>`
  });
});
}

allStudents()
function modalShow(){
  document.querySelector(".new-modal").style.display = "block"
}
window.modalShow = modalShow
}

function edit(id, teacherName, course, rollNo){
  console.log(id, teacherName, course, rollNo)
}

window.edit = edit