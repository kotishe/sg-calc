ymaps.ready(['DeliveryCalculator']).then(function init () {
    var myMap = new ymaps.Map('map', {
            center: [55.909574, 38.021266],
            zoom: 17,
            type: 'yandex#map',
            controls: ['zoomControl'],
        }, {
            // В нашем примере хотспотные данные есть только для 9 и 10 масштаба.
            // Поэтому ограничим диапазон коэффициентов масштабирования карты.
            minZoom: 5,
            maxZoom: 17,
			autoFitToViewport: 'always'
        }),
        searchStartPoint = new ymaps.control.SearchControl({
            options: {
                useMapBounds: true,
                noPlacemark: true,
                noPopup: true,
                placeholderContent: 'Адрес начальной точки',
                size: 'large'
            }
        }),
        searchFinishPoint = new ymaps.control.SearchControl({
            options: {
                useMapBounds: true,
                noCentering: true,
                noPopup: true,
                noPlacemark: true,
                placeholderContent: 'Адрес конечной точки',
                size: 'large'
            }
        }),
        calculator = new ymaps.DeliveryCalculator(myMap),
		myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Scale Group',
            balloonContent: 'Scale Group <br> Московская обасть, г.Щелково, ул.Заводская д.8 <br>+7 (495) 744-74-65 +7 (925) 744-74-65'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'images/faviconSG.png',
            // Размеры метки.
            iconImageSize: [32, 32],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-3, -32]
        });
	myMap.geoObjects.add(myPlacemark);	
    myMap.controls.add(searchStartPoint);
    myMap.controls.add(searchFinishPoint);

    searchStartPoint.events
        .add('resultselect', function (e) {
            var results = searchStartPoint.getResultsArray(),
                selected = e.get('index'),
                point = results[selected].geometry.getCoordinates();

            // Задаем начало маршрута.
            calculator.setStartPoint(point);
        })
        .add('load', function (event) {
            // По полю skip определяем, что это не дозагрузка данных.
            // По getResultsCount определяем, что есть хотя бы 1 результат.
            if (!event.get('skip') && searchStartPoint.getResultsCount()) {
                searchStartPoint.showResult(0);
            }
        });

    searchFinishPoint.events
        .add('resultselect', function (e) {
            var results = searchFinishPoint.getResultsArray(),
                selected = e.get('index'),
                point = results[selected].geometry.getCoordinates();

            // Задаем конец маршрута.
            calculator.setFinishPoint(point);
        })
        .add('load', function (event) {
            // По полю skip определяем, что это не дозагрузка данных.
            // По getResultsCount определяем, что есть хотя бы 1 результат.
            if (!event.get('skip') && searchFinishPoint.getResultsCount()) {
                searchFinishPoint.showResult(0);
            }
        });
});
