const Realm = require('realm');

class Account {}
Account.schema = {
    name: 'Account',
    primaryKey: 'email',
    properties: {
        email: 'string',
        password: 'string',
    },
};

class App {}
App.schema = {
    name: 'App',
    primaryKey: 'email',
    properties: {
        email: 'string',
    },
};

const realm = new Realm({schema: [Account,App], schemaVersion:1 }); //updates

export function getAccount (email) { //getLatestEmail mau ambil password dari sini
    if(email){
        let r = realm.objects('Account').filtered('email ="' + email + '"');
        console.log(r);
        return r;
    }
    return null
}

export function getLatestEmail () { //simpan login terakhir
    let r = realm.objects('App');
    console.log(r);
    return r;
}

export function saveLatestEmail (email) {
    realm.write(() => {
        savedApp = realm.create('App', {
            email: email,
        });
    });
}

export function saveAccount (email,password) { //simpan di realm
    // Write
    realm.write(() => {
        savedAccount = realm.create('Account', {
            email: email,
            password: password,
        });
    });
}