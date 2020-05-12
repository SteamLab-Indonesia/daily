const Realm = require('realm');

class Account {}
Account.schema = {
    name: 'Account',
    primaryKey: 'email', //untuk blokir email yg sama, unique data
    properties: {
        email: 'string',
        password: 'string',
    },
};

class App {}
App.schema = {
    name: 'App',
    primaryKey: 'id', 
    properties: {
        email: 'string',
        id: 'int'
    },
};

const realm = new Realm({schema: [Account,App], schemaVersion:2 }); //updates

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
    if (r.length > 0)
        return r[0].email
    return "";
}

export function saveLatestEmail (email) {
    realm.write(() => {
        realm.create('App', {
            email: email,
            id: 0
        },true);
    });
}

export function saveAccount (email,password) { //simpan di realm
    // Write
    realm.write(() => {
        realm.create('Account', {
            email: email,
            password: password,
        },true);
    });
}