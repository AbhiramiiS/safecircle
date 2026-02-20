// SOS FUNCTION
function sendSOS() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;
      let mapLink = `https://maps.google.com/?q=${lat},${lon}`;

      document.getElementById("location").innerHTML =
        `📍 Location: ${lat}, ${lon}<br>Map: <a href="${mapLink}" target="_blank">Open Map</a>`;

      document.getElementById("map").src =
        `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;

      alert("🚨 SOS Sent!\nI am in danger. My location: " + mapLink);

let phone = "91XXXXXXXXXX"; // replace with your number
let message = `I am in danger. My location: ${mapLink}`;
window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);

    });
  }
}

// FAKE CALL FEATURE
function fakeCall() {
  let ringtone = document.getElementById("ringtone");
  ringtone.play();
  alert("📞 Incoming Call from Mom ❤️");
}

// SAVE CONTACTS
function saveContact() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;

  if (name === "" || phone === "") {
    alert("Enter name and phone!");
    return;
  }

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push({ name, phone });
  localStorage.setItem("contacts", JSON.stringify(contacts));

  alert("Contact Saved!");
  loadContacts();
}

function loadContacts() {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  let list = document.getElementById("contactList");
  list.innerHTML = "";

  contacts.forEach(c => {
    let li = document.createElement("li");
    li.innerText = c.name + " - " + c.phone;
    list.appendChild(li);
  });
}
alert("SOS Sent to Trusted Contacts!");
function startVoiceSOS() {
  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  document.getElementById("voiceStatus").innerText = "Listening... Say HELP ME";

  recognition.onresult = function(event) {
    let speech = event.results[0][0].transcript.toLowerCase();
    document.getElementById("voiceStatus").innerText = "Heard: " + speech;

    if (speech.includes("help") || speech.includes("emergency")) {
      sendSOS();
      alert("Voice SOS Triggered!");
    }
  };
}

loadContacts();