const url = process.env.REACT_APP_SERVER_URL_API

export const FreelancersMocks: {[key: string]: any} = {
    [`${url}/v1/admin/freelancer/cooperation_types`]: {
        cooperations: [
            {
                id: 1,
                name: 'Бесплатно'
            },
            {
                id: 2,
                name: 'За бабки'
            },
            {
                id: 3,
                name: 'Бартер'
            },
        ]
    },
    [`${url}/v1/admin/freelancers`]: {
        freelancers: [
            {
                id: 1,
                name: 'Калашников Павел Сергеевич',
                isActive: false,
                image: '',
                cooperationType: {
                    id: 1,
                    name: ''
                }
            },
            {
                id: 2,
                name: 'Нечепорук Максим Алексеевич',
                isActive: true,
                image: '',
                cooperationType: {
                    id: 1,
                    name: ''
                }
            },
            {
                id: 3,
                name: 'Первунина Марина Алексеевна',
                isActive: true,
                image: '',
                cooperationType: {
                    id: 1,
                    name: ''
                }
            },
        ]
    },
    [`${url}/v1/admin/freelancer/additional/cities`]: {  //
        additionalCities: [
            {
                id: 1,
                name: 'Москва'
            },
            {
                id: 2,
                name: 'Питер'
            },
            {
                id: 3,
                name: 'ЕКБ'
            },
            {
                id: 4,
                name: 'Тверь'
            },
            {
                id: 5,
                name: 'Саратов ('
            },
            {
                id: 6,
                name: 'Новгород'
            },
            {
                id: 7,
                name: 'Челяба'
            },
            {
                id: 8,
                name: 'Ростов'
            },
            {
                id: 9,
                name: 'Краснодар'
            },
            {
                id: 10,
                name: 'Волгоград'
            },
            {
                id: 11,
                name: 'Самара'
            },
            {
                id: 12,
                name: 'Уфа'
            },
            {
                id: 13,
                name: 'Тюмень'
            },
            {
                id: 14,
                name: 'Пермь'
            },
            {
                id: 15,
                name: 'Рязань'
            },
            {
                id: 16,
                name: 'Ярославль'
            },
        ]
    },
    [`${url}/v1/admin/freelancer/:freelancerId/additional_cities`]: { // 
        additionalCities: [
            {
                id: 1,
                name: 'Москва'
            },
            {
                id: 3,
                name: 'ЕКБ'
            },
        ]
    },
    [`${url}/v1/admin/freelancers/social_networks`]: { // 
        socialNetworks: [
            {
                id: 1,
                name: 'Тикток',
                slug: 'tt'
            },
            {
                id: 2,
                name: 'Ютуб',
                slug: 'youtube'
            },
            {
                id: 3,
                name: 'ВК',
                slug: 'vk'
            },
            {
                id: 4,
                name: 'Телеграм',
                slug: 'tg'
            }
        ]
    },
    [`${url}/v1/admin/freelancer/:freelancerId/social_networks`]: { // 
        socialNetworks: [
            {
                id: 2,
                name: 'Ютуб',
                slug: 'youtube'
            },
            {
                id: 4,
                name: 'Телеграм',
                slug: 'tg'
            }
        ]
    },
    [`${url}/v1/admin/freelancer/:freelancerId/additional_specialities`]: { //
        additionalSpecialities: [
            {
                id: 3,
                name: 'Педиатор'
            },
            {
                id: 4,
                name: 'Терапевт'
            },
            {
                id: 5,
                name: 'Стоматолог'
            },
            {
                id: 6,
                name: 'Глаза смотрит'
            }
        ]
    },
    [`${url}/v1/admin/freelancer/additional_specialities/:doctorId`]: {  // 
        additionalSpecialities: [
            {
                id: 4,
                name: 'Терапевт'
            },
            {
                id: 5,
                name: 'Стоматолог'
            },
        ]
    },
    [`${url}/v1/admin/freelancers/cities`]: {
        cities: [
            {
                id: 1,
                name: 'Москва'
            },
            {
                id: 2,
                name: 'Питер'
            },
            {
                id: 3,
                name: 'ЕКБ'
            },
            {
                id: 4,
                name: 'Тверь'
            },
            {
                id: 5,
                name: 'Саратов ('
            },
            {
                id: 6,
                name: 'Новгород'
            },
            {
                id: 7,
                name: 'Челяба'
            },
            {
                id: 8,
                name: 'Ростов'
            },
            {
                id: 9,
                name: 'Краснодар'
            },
            {
                id: 10,
                name: 'Волгоград'
            },
            {
                id: 11,
                name: 'Самара'
            },
            {
                id: 12,
                name: 'Уфа'
            },
            {
                id: 13,
                name: 'Тюмень'
            },
            {
                id: 14,
                name: 'Пермь'
            },
            {
                id: 15,
                name: 'Рязань'
            },
            {
                id: 16,
                name: 'Ярославль'
            },
        ]
    },
    [`${url}/v1/admin/freelancers/specialities`]: {
        specialities: [
            {
                id: 3,
                name: 'Технический специалист'
            },
            {
                id: 4,
                name: 'SMM'
            },
            {
                id: 5,
                name: 'Дизайнер'
            },
            {
                id: 6,
                name: 'Фотограф'
            }
        ]
    },
    [`${url}/v1/admin/freelancer/:id`]: {
        id: 222,
        name: 'Калашников Павел Сергеевич',
        email: 'ctop124@mail.ru',
        slug: 'kalashnikov',
        isActive: true,
        portfolioLink: 't.me/it_portfolio_web',
        tgUrl: '@kalashnikoff069',
        agencyRepresentative: false,
        priceCategory: 2,
        mainCity: {
            id: 4,
            name: 'Тверь'
        },
        mainSpeciality: {
            id: 3,
            name: 'Технический специалист'
        },
        image: 'https://medblogers-freelancers-photos.storage.yandexcloud.net/images/user_kalashnikov-pavel-sergeevich_Снимок%20экрана%202025-10-20%20в%2002.40.55.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJE0dbB1ceTT28e9UHQE3fM%2F20260131%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20260131T100208Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=e752df45bbbbe97897f6ceaf7e1baf55aa8e2b7acbfb016954e409af8b1e6b96',
        birthDate: '12.07.2004',
        createdAt: '20.01.2026',
        dateStarted: '20.01.2026',
        cooperationType: {
            id: 1,
            name: 'Бесплатно'
        }
    },
    [`${url}/v1/admin/freelancer/:freelancerId/price_list`]: {
        priceList: [
            { id: 1, name: 'Бот под ключ', amount: '15000' },
            { id: 2, name: 'Разработка сайта', amount: '0' },
            { id: 3, name: '1 час работы', amount: '2000' },
            { id: 4, name: 'Переписать сайт на более современные технологии (React, Next), Добавление нового функционала на сайт', amount: '30000' },
            { id: 5, name: 'Добавление нового функционала на сайт', amount: '5000' },
        ]
    }
};