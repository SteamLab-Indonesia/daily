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
        userID: 'string',
        id: 'int'
    },
};

const realm = new Realm({schema: [Account,App], schemaVersion:4 }); //updates

export function getAccount (email) { //getLatestEmail mau ambil password dari sini

    if(email){
        let r = realm.objects('Account').filtered('email ="' + email + '"');
        return {email: r[0].email, password: r[0].password};
    }
    return null
}

export function getLatestEmail () { //simpan login terakhir
    let r = realm.objects('App');
    if (r.length > 0)
        return r[0].email
    return "";
}

export function getLatestUserID () { //simpan login terakhir
    let r = realm.objects('App');
    if (r.length > 0)
        return r[0].userID
    return "";
}

export function saveLatestEmail (email,userID) {
    realm.write(() => {
        realm.create('App', {
            email: email,
            userID: userID,
            id: 0
        },true);
    });
}

export function saveAccount (email,password) { //simpan di realm

    console.log('save account: ', email, password);
    // Write
    realm.write(() => {
        realm.create('Account', {
            email: email,
            password: password,
        },true);
    });
}