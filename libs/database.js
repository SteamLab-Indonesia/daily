import firestore from '@react-native-firebase/firestore';
import { format } from "date-fns";
import auth from '@react-native-firebase/auth'

const reminderCollection = firestore().collection('reminder');
const categoryCollection = firestore().collection('category');
const statisticsCollection = firestore().collection('statistics');
const usersCollection = firestore().collection('user');

export function createUser(username,password) {
	return new Promise((resolve, reject) => {
		auth().createUserWithEmailAndPassword(username, password).then(() => {
			resolve('success');
		}).catch((err)=>reject(err));
	})
}

export function addUserDatabase(newData) {
	return new Promise((resolve,reject)=>{
		if(newData){
			usersCollection
			.add(newData)
			.then((snapshot) => {
				resolve(snapshot)
			})
			.catch((err) => reject(err));
		}
		
  })
}

export function getUser(username){
	return new Promise((resolve,reject)=>{
		usersCollection
		.where('user', '==', username)
		.get()
		.then((snapshot) => {
			if(snapshot.empty){
				resolve(null);
			}
			else{
				let data = {
					id: snapshot.docs[0].id,
					user: snapshot.docs[0].data().user,
				};
				resolve(data)
			}
        })
        .catch((err) => reject(err));
  })
}

export function timeToString(time) {
    const date = new Date(time);
    return format(date, "yyyy-MM-dd");
}

export function reminderDate(time) {
	const date = new Date(time);
    return format(date, "eee, MMMM dd yyyy");
}

export function reminderMM(time) {
	const date = new Date(time);
    return format(date, "MMMM");
}

export function getReminder(usernameID){
	return new Promise((resolve,reject)=>{
		reminderCollection
		.where('user', '==', usersCollection.doc(usernameID))
		.orderBy('complete', 'asc')
		.orderBy('date', 'desc')		
		.get()
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
						category: snapshot.docs[i].data().category,
						user: snapshot.docs[i].data().user
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

export function deleteReminder(id){
	return new Promise((resolve,reject)=>{
		reminderCollection.doc(id).delete().then(
			()=>{resolve('success')}
		)
		.catch((err) => reject(err));
	})
}

export function getCategory(userID){
	if(userID && typeof userID != 'object')
		userID = usersCollection.doc(userID);
	return new Promise((resolve,reject)=>{
		categoryCollection
		.where ('user', '==', userID)
		.get()
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
						color: snapshot.docs[i].data().color,
						user: snapshot.docs[i].data().user
					};
					data.push(object);
                }
				resolve(data);
			}
        })
        .catch((err) => reject(err));
  })
}

export function getStatistics(userID, month,year, category){
	// If category not empty and isn't reference or object
	if(category && typeof category != 'object')
		category = categoryCollection.doc(category);
	if(userID && typeof userID != 'object')
		userID = usersCollection.doc(userID);

	return new Promise((resolve,reject)=>{
		let query = statisticsCollection
		.where('month', '==', month)
		.where('year', '==', year)
		.where('user', '==', userID)

		if (category != null)
		{
			query = query.where('category', '==', category);
		}
		
		query.get()
		.then((snapshot) => {
			if(snapshot.empty){
				resolve(null);
			}
			else{
				
				let data = [];
				for (let i=0;i< snapshot.docs.length; ++i){
					let duration= snapshot.docs[i].data().duration;
					if (!duration){
						duration = 0;
					}
					let object ={
						id: snapshot.docs[i].id,
						month: snapshot.docs[i].data().month,
						category: snapshot.docs[i].data().category,
						year: snapshot.docs[i].data().year,
						duration,
						user: snapshot.docs[i].data().user
					};
					data.push(object)
				}
				resolve(data);
			}
        })
        .catch((err) => reject(err));
  })
}

export function addStatistics(newData){
	return new Promise((resolve,reject)=>{
		if (newData.category)
			{
				//if category is string (not object), then need conversion
				if(typeof newData.category != 'object')
				// Convert to document reference (category collection)
				{
					newData.category = categoryCollection.doc(newData.category);
				}
			}
		if (newData.user)
			{
				//if category is string (not object), then need conversion
				if(typeof newData.user != 'object')
				// Convert to document reference (category collection)
				{
					newData.user = usersCollection.doc(newData.user);
				}
			}
		statisticsCollection
		.add(newData)
		.then((snapshot) => {
			resolve(snapshot.id);
        })
        .catch((err) => reject(err));
  })
}

export function updateStatistics(id,duration){
	return new Promise((resolve,reject)=>{
		statisticsCollection.doc(id).update({duration})
		.then((snapshot) => {
			resolve('success')
        })
        .catch((err) => reject(err));
  })
}

export function login(username, password) {

	return new Promise((resolve, reject) => {
		auth().signInWithEmailAndPassword(username, password).then(() => {
			resolve();
		}).catch((err)=>reject(err));
	})
}

export function logout() {
	return new Promise((resolve, reject) => {
		auth().signOut().then(() => {
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
			if (newData.user)
			{
				// Convert to document reference (category collection)
				newData.user = usersCollection.doc(newData.user);
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
			if (newData.user)
			{
				// Convert to document reference (category collection)
				newData.user = usersCollection.doc(newData.user);
			}
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


export function onReminderChange(usernameID, callbackFunction)
{
	reminderCollection
	.where('user', '==', usersCollection.doc(usernameID))
	.orderBy('complete', 'asc')
	.orderBy('date', 'desc')	
	.onSnapshot((snapshot) => {

		if(snapshot.empty){
			resolve(null);
		}
		else
		{
			let data = {};
			for (let i=0;i< snapshot.docs.length; ++i){
				let object = {
					id: snapshot.docs[i].id,
					date: snapshot.docs[i].data().date,
					name: snapshot.docs[i].data().task,
					complete: snapshot.docs[i].data().complete,
					category: snapshot.docs[i].data().category,
					user: snapshot.docs[i].data().user
				};
				if (! data[timeToString(object.date.toDate())])
					data[timeToString(object.date.toDate())] = []; //initialise
				data[timeToString(object.date.toDate())].push(object); //array, dlm array multiple obj
			}
	
			if (callbackFunction)
				callbackFunction(data);
		}
	})
}