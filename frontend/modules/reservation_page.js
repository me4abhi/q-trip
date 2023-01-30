import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  const apiEndpoint = config.backendEndpoint + "/reservations/";
  try {
    let reservations = await (await fetch(apiEndpoint)).json();
    return reservations;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  console.log(reservations);

  const noReservationBanner = document.getElementById("no-reservation-banner");
  const reservationTableParent = document.getElementById(
    "reservation-table-parent"
  );

  if (reservations.length === 0) {
    noReservationBanner.style.display = "block";
    reservationTableParent.style.display = "none";
  } else {
    noReservationBanner.style.display = "none";
    reservationTableParent.style.display = "block";
  }

  let reservationTable = document.getElementById("reservation-table");

  reservations.forEach((reservation) => {
    {
      var date = new Date(reservation.date);
      var time = new Date(reservation.time);
      var month = time.toLocaleString(undefined, { month: "long" });
      var day = time.getDate();
      var year = time.getFullYear();
      var booktime = time.toLocaleString("en-IN").split(" ");

      let k = reservation.adventure;

      var tr = document.createElement("tr");
      tr.innerHTML = `<td>${reservation.id}</td>
      <td>${reservation.name}</td>
      <td>${reservation.adventureName}</td>
      <td>${reservation.person}</td>
      <td>${date.toLocaleDateString("en-IN")}</td>
      <td>${reservation.price}</td>
      <td>${day} ${month} ${year}, ${booktime[1]} ${booktime[2]}</td>
      <td id="${reservation.id}"><a href="../detail/?adventure=${k}">
      <button class="reservation-visit-button">Visit Adventure</button>
     </a></td>`;

      document.getElementById("reservation-table").append(tr);
    }
  });

  //   let dateTime = new Date(reservation["date"]);
  //   let date = dateTime.toLocaleDateString("en-IN");

  //   let bTime = new Date(reservation["time"]);
  //   let options = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric"
  //   };
  //   let bookingTime = bTime.toLocaleString('en-IN', { timeZone: 'UTC' });

  //   reservationTable.innerHTML += `<tr>
  //   <td>${reservation.id}</td>
  //   <td>${reservation.name}</td>
  //   <td>${reservation.adventureName}</td>
  //   <td>${reservation.person}</td>
  //   <td>${date}</td>
  //   <td>${reservation.price}</td>
  //   <td>${bookingTime}</td>
  //   <td>
  //     <button class="reservation-visit-button">
  //         <a href="../detail/?adventure=${reservation.adventure}">Visit Adventure</a>
  //     </button>
  //   </td>
  // </tr>`
  // });
}

export { fetchReservations, addReservationToTable };
