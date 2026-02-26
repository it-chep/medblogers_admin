const url = process.env.REACT_APP_SERVER_URL_API

export const DoctorsMocks: {[key: string]: any} = {
    [`${url}/v1/admin/freelancer/:freelancerId/recommendations`]: {
        recommendations: [
            {
                doctorId: 1,
                doctorName: 'Нечепорук Максим Алексеевич',
            },
            {
                doctorId: 22,
                doctorName: 'Нечепорук Марина Алексеевна?',
            },
            {
                doctorId: 3,
                doctorName: 'Калашников Павел Сергеевич',
            },
        ]
    },
    [`${url}/v1/admin/doctor/additional/cities`]: {
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
    [`${url}/v1/admin/doctor/:doctorId/additional_cities`]: {
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
    [`${url}/v1/admin/doctor/additional/specialities`]: {
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
    [`${url}/v1/admin/doctor/:doctorId/additional_specialities`]: {
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
    [`${url}/v1/admin/doctors`]: {
        doctors: [
            {
                id: 1,
                name: 'Калашников Павел Сергеевич',
                isActive: true,
                image: '',
                cooperationType: {
                    id: 2,
                    name: 'Бесплатно',
                }
            },
            {
                id: 2,
                name: 'Нечепорук Марина Алексеевна',
                isActive: false,
                image: '',
                cooperationType: {
                    id: 1,
                    name: 'Бартер',
                }
            },
            {
                id: 3,
                name: 'Нечепорук Марина Алексеевна',
                isActive: true,
                image: '',
                cooperationType: {
                    id: 3,
                    name: 'Бесплатно',
                }
            },
            {
                id: 55,
                name: 'Новый врач 1',
                isActive: false,
                image: '',
                cooperationType: {
                    id: 3,
                    name: 'Бесплатно',
                }
            }
        ]
    },
    [`${url}/v1/admin/doctor/cooperation_types`]: {
        cooperationTypes: [
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
    [`${url}/v1/admin/doctor/:doctorId/vip_info`]: {
        canBarter: true,
        canBuyAdvertising: true,
        canSellAdvertising: false,
        shortMessage: '',
        advertisingPriceFrom: 12,
        blogInfo: '',
        endDate: '12.03.2026',
        isActive: false,
    },
    [`${url}/v1/admin/doctor/:doctorId`]: {
        id: 3,
        name: 'Калашников Павел Сергеевич',
        email: 'maxim.necheporuk@yandex.ru',
        slug: 'necheporuk-marina-alekseevna',
        isActive: false,
        isKfDoctor: false,
        instUrl: '',
        vkUrl: '',
        dzenUrl: '',
        tgChannelUrl: '',
        tgUrl: '@kalashnikoff069',
        tiktokUrl: '',
        youtubeUrl: '',
        siteLink: 'https://medblogers-base.ru/doctors/tyutin-viktor-dmitrievich',
        mainBlogTheme: '',
        image: 'https://medblogers-photos.storage.yandexcloud.net/images/user_tyutin-viktor-dmitrievich_/app/docstar_site/docstar/user_photos/user_photos/IMG_3933.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJE0dbB1ceTT28e9UHQE3fM%2F20260127%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20260127T190742Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=83bf533cf6504295d7a3fe0a078faa15830ecc0e1eeb69b5bf52b9ec9e5e4126',
        birthDate: '12.07.2004',
        createdAt: '10.11.23',
        marketingPreferences: 'У врачей каких специальностей...',
        medicalDirections: 'Пока хз',
        mainCity: {
            id: 1,
            name: 'Москва',
        },
        mainSpeciality: {
            id: 3,
            name: 'Педиатр'
        },
        cooperationType: {
            id: 1,
            name: 'Бесплатно'
        },
        subscribersInfo: [
            {
                key: 'inst',
                subsCount: '100',
                subsCountText: 'Подписчиков',
                lastUpdatedDate: '27.01.2026'
            },
            {
                key: 'tg',
                subsCount: '2000',
                subsCountText: 'Подписчиков',
                lastUpdatedDate: '27.01.2026'
            },
            {
                key: 'vk',
                subsCount: '50000',
                subsCountText: 'Подписчиков',
                lastUpdatedDate: '27.01.2026'
            },
            {
                key: 'youtube',
                subsCount: '10400',
                subsCountText: 'Подписчиков',
                lastUpdatedDate: '27.01.2026'
            }
        ]
    },
    [`${url}/v1/admin/doctors/cities`]: {
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
    [`${url}/v1/admin/doctors/specialities`]: {
        specialities: [
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
};