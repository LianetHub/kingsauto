var modelFilter = {



    // Наши селекторы
    options: {
        marka: '#mse2_tv\\|marka',
        model: '#mse2_tv\\|model',
        carcase: '#mse2_tv\\|carcase',
    },
    // Запуск функции
    initialize: function () {
        $this = this;
        // Получаем нужные элементы и сохраняем как свойства объекта
        this.marka = $(this.options['marka']);
        this.model = $(this.options['model']);
        this.carcase = $(this.options['carcase']);

        // Смотрим в параметры адресной строки на предмет выбранной марки
        var params = mSearch2.Hash.get();
        // Если нет - отключаем модели
        if (params['marka'] == undefined) {
            $this.disableModel();
        }
        // Если есть - включаем
        else {
            $this.enableModel();
        }


        // Если нет - отключаем каркасы
        if (params['carcase'] == undefined) {
            $this.disableСarcase();
        }
        // Если есть - включаем
        else {
            $this.enableСarcase();
        }




        // Вешаем обработчик на изменение марки
        this.marka.find('select').on('change', function () {
            // Если что-то выбрано, то включаем модели
            if ($(this).val() != '') {
                // Переключим модель на первый пункт "Выберите из списка"
                $this.model.find('option:first').attr('selected', true);
                // И активируем блок
                $this.enableModel();
            }
            // Если нет - отключаем
            else {

                $('[name="model"').val("");
                $('[name="carcase"').val("");
                $this.disableModel();
                $this.disableСarcase();
            }
        })



        // Вешаем обработчик на изменение модель
        this.model.find('select').on('change', function () {
            // Если что-то выбрано, то включаем модели
            if ($(this).val() != '') {
                // Переключим каркас на первый пункт "Выберите из списка"
                $this.carcase.find('option:first').attr('selected', true);
                // И активируем блок
                $this.enableСarcase();
            }
            // Если нет - отключаем
            else {

                $('[name="carcase"').val("");
                $this.disableСarcase();
            }
        })






    },

    // Функция отключения моделей
    disableModel: function () {
        // Ищем все поля с непустым value
        $this.model.find('option[value!=""]').attr('selected', false).attr('disabled', true);
        // И прячем весь блок
        $this.model.hide();
    },

    // Функция включения моделей
    enableModel: function () {
        // Получаем марку автомобиля
        var marka = this.marka.find(':selected').text().replace(/\(.*?\)$/, '').replace(/\s+$/, '');
        var re = new RegExp('^' + marka);
        // Пробегаем по всем моделям и проверяем имя
        $this.model.find('option').each(function () {
            var $this = $(this);
            // Имя не совпадает - нужно отключить эту модель
            if (!$this.text().match(re) && $this.prop('value') != '') {
                $this.attr('disabled', true);
                $this.hide();
            }
            // В противном случае - включить
            else {
                $this.attr('disabled', false);
                $this.show();
            }
        });
        // И показываем весь блок с моделями
        $this.model.show();
    },



    // Функция отключения каркасов
    disableСarcase: function () {
        // Ищем все поля с непустым value
        $this.carcase.find('option[value!=""]').attr('selected', false).attr('disabled', true);
        // И прячем весь блок
        $this.carcase.hide();
    },

    // Функция включения каркасов
    enableСarcase: function () {
        // Получаем модель автомобиля
        var model = this.model.find(':selected').text().replace(/\(.*?\)$/, '').replace(/\s+$/, '');
        var re2 = new RegExp('^' + model);
        // Пробегаем по всем карскасам и проверяем имя
        $this.carcase.find('option').each(function () {
            var $this = $(this);
            // Имя не совпадает - нужно отключить эту модель
            if (!$this.text().match(re2) && $this.prop('value') != '') {
                $this.attr('disabled', true);
                $this.hide();
            }
            // В противном случае - включить
            else {
                $this.attr('disabled', false);
                $this.show();
            }
        });
        // И показываем весь блок с моделями
        $this.carcase.show();
    },









}

// Скрипт запускается после полной загрузки документа
$(document).ready(function () {
    // И если на странице есть фильтры
    if ($('#mse2_mfilter').length > 0) {
        modelFilter.initialize();
    }
});	