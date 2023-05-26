import {createBook, readBook} from '../APIConecction/data.js';

export const parametrosAll = {
    nombre: '',
    genero: '',
	fecha: '',
    id: ''
}


document.addEventListener("DOMContentLoaded", () => {
	const $resultados = document.querySelector("#resultado");
    const nameBook = document.querySelector('#nameBook');
    const genreBook = document.querySelector('#genreBook');
	const dateBook = document.querySelector('#dateBook');
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close');

    nameBook.addEventListener('input', (e) => {
        parametrosAll.nombre = e.target.value;
    });

    genreBook.addEventListener('input', (e) => {
        parametrosAll.genero = e.target.value;
    });

	dateBook.addEventListener('input', (e) => {
		parametrosAll.fecha = e.target.value;
	})

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    })

   
	Quagga.init({
		inputStream: {
			constraints: {
				width: 1920,
				height: 1080,
			},
			name: "Live",
			type: "LiveStream",
			target: document.querySelector('#contenedor'), // Pasar el elemento del DOM
		},
		decoder: {
			readers: ["ean_reader"]
		}
	}, function (err) {
		if (err) {
			console.log(err);
			return
		}
		console.log("Iniciado correctamente");
		Quagga.start();
	});

	const sendBookButton = document.querySelector('#sendBook');

	sendBookButton.addEventListener('click', (e)=>{
		e.preventDefault();

		createBook(parametrosAll)
		readBook()
		console.log(parametrosAll);


		window.location = '../index.html'
	});
	Quagga.onDetected((data) => {
		$resultados.textContent = data.codeResult.code;
        parametrosAll.id = data.codeResult.code;
        modal.style.display = 'flex';

	
		console.log(data);
	});

	Quagga.onProcessed(function (result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
			drawingCanvas = Quagga.canvas.dom.overlay;

		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
					Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
				});
			}

			if (result.box) {
				Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
			}

			if (result.codeResult && result.codeResult.code) {
				Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
			}
		}
	});
});