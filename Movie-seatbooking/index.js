const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

const setMovieData = (movieIndex, moviePrice) => {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
};

// Get data from localstorage and populate UI
const populateUI = () => {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
	if (selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

	if (selectedMovieIndex) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
};

populateUI();

const updateSelectedCount = () => {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');
	const selectedSeatsCount = selectedSeats.length;

	const seatsIndex = [...selectedSeats].map(function (seat) {
		return [...seats].indexOf(seat);
	});

	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
	count.innerText = selectedSeatsCount;
	total.innerText = '$' + selectedSeatsCount * ticketPrice;
};

// Movie select event

movieSelect.addEventListener('change', (e) => {
	ticketPrice = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
});

container.addEventListener('click', function (e) {
	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected');
		updateSelectedCount();
	}
});

updateSelectedCount();
