/*
const form = document.querySelector("form");
const dropArea = document.querySelector(".drag-area");
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");
const allowed_EXT = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png|\.zip|\.rar|\.tar|\.txt|\.mp4|\.mp3|\.7z|\.doc|\.docx|\.xls)$/i;

const files_name_upload = [];

dragForm = document.getElementById('drag-form');
dragText = document.getElementById('drag_text');
dragCloud = document.getElementById('drag-cloud');
dragInput = document.getElementById('file-input');
dragZone = document.getElementById('drag-area');
dragWarper = document.getElementById('drag-warper');






function showToast(s,c) {
  console.log('test');
  var x = document.getElementById("snackbar");
  var text = document.createTextNode(s);
  x.style.backgroundColor = c;
  x.textContent = '';
  x.appendChild(text);
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


// form click event
form.addEventListener("click", () =>{
  fileInput.click();
});

fileInput.onchange = ({target})=>{
  // Check for how much files
  let file = target.files;
  if (file.length === 1){
    // let fileName = file[0].name;
    if (!allowed_EXT.exec(file[0].name)) {
      showToast('For security resion this extenstion is forbided use zip insted', 'red');
    }
    else{
      if (!files_name_upload.includes(file[0].name)){
        files_name_upload.push(file[0].name);
        uploadFile(file[0].name);
      }
    }
  } else {
    showToast('For security resion multiple file uploading is forbided use zip insted', 'blue');
  }
}

dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault();
  dragText.textContent = "Release to Upload File";
  dragCloud.style.color = "#a366ff";
  dragForm.style.borderColor = "#a366ff";
  // dragWarper.style.width = "550px";
  dragText.style.fontSize="24px";
  dragText.style.color="#a366ff";
});


dropArea.addEventListener("dragleave", ()=>{
  dragText.textContent = "Click Or Drag and Drop File to Upload";
  dragCloud.style.color = "#6990F2";
  dragForm.style.borderColor = "#6990F2";
  // dragWarper.style.width = "485px";
  dragText.style.fontSize= "18px";
  dragText.style.color="#6990F2";
  
});


//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault();
  var all_drop_files = event.dataTransfer.files;

  if (all_drop_files.length === 1){
    if (!allowed_EXT.exec(all_drop_files[0].name)) {
      showToast('For security resion this extenstion is forbided use zip insted', 'red');
    }
    else{
      if (!files_name_upload.includes(all_drop_files[0].name)){
        files_name_upload.push(all_drop_files[0].name);
        drop_Upload(all_drop_files[0]);
      }
    }
  } else {
    showToast('For security resion multiple file uploading is forbided use zip insted', 'blue');
  }
  dragText.textContent = "Click Or Drag and Drop File to Upload";
  dragCloud.style.color = "#6990F2";
  dragForm.style.borderColor = "#6990F2";
  // dragWarper.style.width = "485px";
  dragText.style.fontSize= "18px";
  dragText.style.color="#6990F2";
});


function drop_Upload(drop_files){
  var form_data  = new FormData();
  form_data.append("drop_files[]", drop_files);
  var ajax_request = new XMLHttpRequest();
  ajax_request.open("post", "/upload.php");
  var dro_file = drop_files.name;
  ajax_request.upload.addEventListener("progress", ({loaded, total}) =>{
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${dro_file} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if(loaded == total){
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${dro_file} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });
  ajax_request.send(form_data);
}




function uploadFile(name){
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload.php");
  xhr.upload.addEventListener("progress", ({loaded, total}) =>{
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if(loaded == total){
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });
  let data = new FormData(form);
  xhr.send(data);
}*/


/*document.addEventListener("DOMContentLoaded", function() {
    // Selecting elements
    const dropArea = document.getElementById("drag-area");
    const fileInput = document.getElementById("file-input");
    const uploadButton = document.createElement("button");
    uploadButton.textContent = "Upload File";
    uploadButton.classList.add("upload-button");
    dropArea.appendChild(uploadButton);
    
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    dropArea.appendChild(progressBar);
    
    const statusText = document.createElement("p");
    statusText.classList.add("status-text");
    dropArea.appendChild(statusText);

    // Function to show toast notifications
    function showToast(message, color) {
        const toast = document.getElementById("snackbar");
        toast.textContent = message;
        toast.style.backgroundColor = color;
        toast.className = "show";
        setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
    }

    // Handle file selection and validation
    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (!file.name.endsWith(".epub") && !file.name.endsWith(".azw3")) {
                showToast("Invalid file type. Only EPUB and AZW3 are allowed.", "red");
                return;
            }
            uploadFile(file);
        }
    }

    // Drag and drop event listeners
    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("active");
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
    });

    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        dropArea.classList.remove("active");
        handleFiles(event.dataTransfer.files);
    });

    // File input change event
    fileInput.addEventListener("change", () => {
        handleFiles(fileInput.files);
    });

    // Upload button click event
    uploadButton.addEventListener("click", () => {
        if (fileInput.files.length > 0) {
            handleFiles(fileInput.files);
        } else {
            showToast("Please select a file first.", "orange");
        }
    });

    // Function to upload file and track progress
    function uploadFile(file) {
        const formData = new FormData();
        formData.append("file", file);

        statusText.textContent = "Uploading...";
        progressBar.style.width = "10%";

        fetch("http://localhost:5000/convert", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) throw new Error("Conversion failed");
            progressBar.style.width = "50%";
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "converted.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            progressBar.style.width = "100%";
            statusText.textContent = "Download complete!";
            showToast("Conversion successful!", "green");
        })
        .catch(error => {
            statusText.textContent = "Conversion failed!";
            showToast("Error: " + error.message, "red");
        });
    }
});


*/



document.addEventListener("DOMContentLoaded", function() {
    const dropArea = document.getElementById("drag-area");
    const fileInput = document.getElementById("file-input");
    const uploadButton = document.getElementById("upload-button");
    const progressBar = document.getElementById("progress-bar");
    const statusText = document.createElement("p");
    statusText.classList.add("status-text");
    dropArea.appendChild(statusText);

    function showToast(message, color) {
        const toast = document.getElementById("snackbar");
        toast.textContent = message;
        toast.style.backgroundColor = color;
        toast.className = "show";
        setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (!file.name.endsWith(".epub") && !file.name.endsWith(".azw3")) {
                showToast("Invalid file type. Only EPUB and AZW3 are allowed.", "red");
                return;
            }
            uploadFile(file);
        }
    }

    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("active");
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
    });

    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        dropArea.classList.remove("active");
        handleFiles(event.dataTransfer.files);
    });

    fileInput.addEventListener("change", () => {
        handleFiles(fileInput.files);
    });

    uploadButton.addEventListener("click", () => {
        if (fileInput.files.length > 0) {
            handleFiles(fileInput.files);
        } else {
            showToast("Please select a file first.", "orange");
        }
    });

    function uploadFile(file) {
        const formData = new FormData();
        formData.append("file", file);

        statusText.textContent = "Uploading...";
        progressBar.style.width = "10%";

        fetch("http://localhost:5000/convert", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) throw new Error("Conversion failed");
            progressBar.style.width = "50%";
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "converted.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            progressBar.style.width = "100%";
            statusText.textContent = "Download complete!";
            showToast("Conversion successful!", "green");
        })
        .catch(error => {
            statusText.textContent = "Conversion failed!";
            showToast("Error: " + error.message, "red");
        });
    }
});


