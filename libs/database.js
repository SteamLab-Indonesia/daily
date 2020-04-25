import firestore from '@react-native-firebase/firestore';
import { format } from "date-fns";

const reminderCollection = firestore().collection('reminder');
const usersCollection = firestore().collection('Users');
const categoryCollection = firestore().collection('category');

export function timeToString(time) {
    const date = new Date(time);
    return format(date, "yyyy-MM-dd");
}

export function reminderDate(time) {
	const date = new Date(time);
    return format(date, "eee, MMMM dd yyyy");
}

export function getReminder(){
	return new Promise((resolve,reject)=>{
		reminderCollection.get()
		.then((snapshot) => {
			if(snapshot.empty){
				resolve(null);
			}
			else{
				let data = {};
				for (let i=0;i< snapshot.docs.length; ++i){
					let object = {
						id: snapshot.docs[i].id,
						date: snapshot.docs[i].data().date,
						name: snapshot.docs[i].data().task,
						complete: snapshot.docs[i].data().complete,
						category: snapshot.docs[i].data().category
                    };
                    if (! data[timeToString(object.date.toDate())])
                        data[timeToString(object.date.toDate())] = []; //initialise
                    data[timeToString(object.date.toDate())].push(object); //array, dlm array multiple obj
				}
				resolve(data);
			}
        })
        .catch((err) => reject(err));
  })
}

export function getCategory(){
	return new Promise((resolve,reject)=>{
		categoryCollection.get()
		.then((snapshot) => {
			if(snapshot.empty){
				resolve(null);
			}
			else{
				let data = [];
				for (let i=0;i< snapshot.docs.length; ++i){
					let object = {
						id: snapshot.docs[i].id,
						listCat: snapshot.docs[i].data().listCat,
						color: snapshot.docs[i].data().color
					};
					data.push(object);
                }
				resolve(data);
			}
        })
        .catch((err) => reject(err));
  })
}

export function login(username, password) {

	return new Promise((resolve, reject) => {
		firebase.auth().signInWithEmailAndPassword(username, password).then(() => {
			updateUser(username);
			resolve();
		}).catch((err)=>reject(err));
	})
}

export function logout() {
	return new Promise((resolve, reject) => {
		firebase.auth().signOut().then(() => {
			resolve('success');
		})
		.catch((err) => reject(err))
	})
}

export function updateReminder(reminderID, newData){
	return new Promise((resolve,reject)=>{
		if (reminderID)
		{
			let currentDoc = reminderCollection.doc(reminderID);
			if (currentDoc)
			{
				currentDoc.update(newData).then(()=>
				{
					resolve('success');
				}).catch((err) => reject(err));
			}
		}
		else
		{
			reject('Invalid Reminder ID')
		}
	})
}

export function insertReminder(newData){
	return new Promise((resolve,reject)=>{
		if (newData)
		{
			// newData.category is still string
			if (newData.category)
			{
				// Convert to document reference (category collection)
				newData.category = categoryCollection.doc(newData.category);
			}
			reminderCollection.add(newData)
			.then((snapshot) => {
				console.log(snapshot);
				resolve(snapshot.id);
			})
		}
		else
		{
			reject('Invalid Reminder ID')
		}
	})
}

export function insertCategory(newData){
	return new Promise((resolve,reject)=>{
		if (newData)
		{
			categoryCollection.add(newData)
			.then((snapshot) => {
				console.log(snapshot);
				resolve(snapshot.id);
			})

		}
		else
		{
			reject('Invalid Category ID')
		}
	})
}