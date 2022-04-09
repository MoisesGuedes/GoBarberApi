interface IMailConfig {
    driver: 'etherial' | 'ses';

    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'etherial',

    defaults: {
        from: {
            email: 'moisesguedesah@gmail.com',
            name: 'Moises Lindão',
        },
    },
} as IMailConfig;
