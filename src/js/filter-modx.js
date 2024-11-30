var modelFilter = {

    // Наши селекторы
    options: {
        marka: '#tv\\|marka_0',
        model: '#tv\\|model_0',
        carcase: '#tv\\|carcase_0',
    },
    // Запуск функции
    initialize: function () {
        const $this = this;

        // Получаем элементы
        this.marka = $(this.options['marka']);
        this.model = $(this.options['model']);
        this.carcase = $(this.options['carcase']);

        // Смотрим параметры адресной строки
        var params = mSearch2.Hash.get();

        // Проверяем состояние полей на основе адресной строки
        if (params['marka'] === undefined || params['marka'] === '') {
            $this.disableModel();
            $this.disableСarcase();
        } else {
            $this.enableModel();
            $this.filterModels();
            if (params['model'] === undefined || params['model'] === '') {
                $this.disableСarcase();
            } else {
                $this.enableСarcase();
                $this.filterCarcases();
            }
        }

        // Вешаем обработчики изменений
        this.marka.on('change', function () {
            $this.model.val('');
            $this.model.find('option:first').attr('selected', true);
            $this.carcase.val('');
            $this.carcase.find('option:first').attr('selected', true);
            $this.updateFieldState();
            $this.filterModels();
        });

        this.model.on('change', function () {
            $this.carcase.val('');
            $this.carcase.find('option:first').attr('selected', true);
            $this.updateFieldState();
            $this.filterCarcases();
        });
    },

    // Функция обновления состояния полей
    updateFieldState: function () {
        const markaValue = this.marka.val();
        const modelValue = this.model.val();

        if (!markaValue) {
            this.disableModel();
            this.disableСarcase();
        } else {
            this.enableModel();
            if (!modelValue) {
                this.disableСarcase();
            } else {
                this.enableСarcase();
            }
        }
    },

    // Функция фильтрации моделей
    filterModels: function () {
        const selectedMarka = this.marka.find(':selected').text().trim();
        const re = new RegExp('^' + selectedMarka, 'i');

        this.model.find('option').each(function () {
            const $option = $(this);
            if (!$option.text().match(re) && $option.val() !== '') {
                $option.hide().prop('disabled', true);
            } else {
                $option.show().prop('disabled', false);
            }
        });
    },


    // Функция фильтрации каркасов
    filterCarcases: function () {
        const selectedModel = this.model.find(':selected').text().trim();
        const re = new RegExp('^' + selectedModel, 'i');

        this.carcase.find('option').each(function () {
            const $option = $(this);
            if (!$option.text().match(re) && $option.val() !== '') {
                $option.hide().prop('disabled', true);
            } else {
                $option.show().prop('disabled', false);
            }
        });
    },

    // Функция отключения моделей
    disableModel: function () {
        this.model.attr('disabled', true).val('');
    },

    // Функция включения моделей
    enableModel: function () {
        this.model.attr('disabled', false);
    },

    // Функция отключения каркасов
    disableСarcase: function () {
        this.carcase.attr('disabled', true).val('');
    },

    // Функция включения каркасов
    enableСarcase: function () {
        this.carcase.attr('disabled', false);
    },
};

// Скрипт запускается после полной загрузки документа
$(document).ready(function () {
    modelFilter.initialize();
});
