const seatsContainer = document.getElementById("seats");

let ws = new WebSocket("wss://changingseats-server.onrender.com");

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.type === "seats") {
    renderSeats(msg.data);
  }
};

function renderSeats(data) {
  seatsContainer.innerHTML = "";
  data.forEach((seat, i) => {
    const div = document.createElement("div");
    div.className = "seat";
    div.innerHTML = `<strong>${i + 1}番</strong><br>`;
    if (seat) {
      div.innerHTML += `${seat.name} (${seat.number})`;
    } else {
      div.classList.add("empty");
      div.innerHTML += `空席`;
    }
    seatsContainer.appendChild(div);
  });
}

function resetSeats() {
  if (confirm("全席の情報を削除してよろしいですか？")) {
    ws.send(JSON.stringify({ type: "reset" }));
  }
}
