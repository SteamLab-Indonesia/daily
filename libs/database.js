import firestore from '@react-native-firebase/firestore';
import { format } from "date-fns";

const reminderCollection = firestore().collection('reminder');
const usersCollection = firestore().collection('Users');

export function timeToString(time) {
    const date = new Date(time);
    return format(date, "yyyy-MM-dd");
}

export function reminderDate(time) {
	const date = new Date(time);
    return format(date, "E..EEE, yyyy-MM-dd");
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
						complete: snapshot.docs[i].data().complete
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

export function getIncomeCategory(){
	return new Promise((resolve,reject)=>{
		const db = firebase.firestore();
		db.collection('Category').where('section', '==', 'Income').get()
		.then((snapshot) => {
			if(snapshot.empty){
				resolve(null);
			}
			else{
				let data = [];
				for (let i=0;i< snapshot.docs.length; ++i){
					let object = {
						id: snapshot.docs[i].id,
						name: snapshot.docs[i].data().name
					};
					data.push(object);
				}


				resolve(data);
			}
		})
  })
}

export function getExpenseCategory(){
	return new Promise((resolve,reject)=>{
		const db = firebase.firestore();
		db.collection('Category').where('section', '==', 'Expense').get()
		.then((snapshot) => {
			if(snapshot.empty){
				resolve(null);
			}
			else{
				let data = [];
				for (let i=0;i< snapshot.docs.length; ++i){
					let object = {
						id: snapshot.docs[i].id,
						name: snapshot.docs[i].data().name
					};
					data.push(object);
				}


				resolve(data);
			}
		})
  })
}

export function updateReminder(reminderID, newData){
	return new Promise((resolve,reject)=>{
		if (reminderID)
		{
			const db = firebase.firestore();
			let currentDoc = reminderCollection.doc(reminderID);
			if (currentDoc)
			{
				currentDoc.set(newData).then(()=>
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
			reminderCollection.add(newData)
			.then((snapshot) => {
				console.log(snapshot);
				resolve(snapshot.id);
			})
			// if (currentDoc)
			// {
			// 	currentDoc.add(newData).then(()=>
			// 	{
			// 		resolve('success');
			// 	}).catch((err) => reject(err));
			// }
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
			const db = firebase.firestore();
			db.collection('Category').add(newData)
			.then((snapshot) => {
				console.log(snapshot);
				resolve(snapshot.id);
			})
			// if (currentDoc)
			// {
			// 	currentDoc.add(newData).then(()=>
			// 	{
			// 		resolve('success');
			// 	}).catch((err) => reject(err));
			// }
		}
		else
		{
			reject('Invalid Category ID')
		}
	})
}

export function getChatroom(sender, recipient)
{
	return new Promise((resolve, reject) => {
		const db = firebase.firestore();
		db.collection('chatroom')
		.where('sender', 'in', [sender, recipient])
		.get().
		then((data) => {
			if (data.empty)
				resolve(null);
			else
			{
				for (let i=0; i < data.docs.length; ++i)
				{
					let chatroom = data.docs[i];
					if (chatroom.data().recipient == recipient ||
						chatroom.data().recipient == sender)
					{
						resolve({
							id: chatroom.id,
							sender: chatroom.data().sender,
							recipient: chatroom.data().recipient
						})
					}
				}
				resolve(null);
			}
		}).catch((err) => reject(err));
	})
}

export function getChatMessage(chatroomId)
{
	return new Promise((resolve,reject)=>{
		const db = firebase.firestore();
		db.collection('chats')
		.where('chatroom', '==', db.collection('chatroom').doc(chatroomId))
		.orderBy('timestamp', 'desc')
		.limit(100).get()
		.then((snapshot) =>{
			if (snapshot.empty)
				resolve([])
			else
			{
				let messages = [];
				for(let i=0; i < snapshot.docs.length; ++i)
				{
					let doc = snapshot.docs[i];
					messages.push({
						id: doc.id,
						from: doc.data().from,
						message: doc.data().message,
						timestamp: doc.data().timestamp
					})
				}
				resolve(messages);
			}
		}).catch((err)=>reject(err));
	})
}

export function sendChatMessage(chatroomId, from, message) {
	return new Promise((resolve, reject) => {
		const db = firebase.firestore();

		if (!chatroomId)
			reject('Invalid Chatroom Id');

		db.collection('chats').add({
			chatroom: db.collection('chatroom').doc(chatroomId),
			from: from,
			message: message,
			timestamp: new Date()
		}).then((snapshot) => {
			resolve(snapshot.id);
		}).catch((err) => reject(err));
	});
}

export function onNewChatMessage(chatroomId, callbackFunction)
{
	const db = firebase.firestore();
	db.collection('chats')
	.where('chatroom', '==', db.collection('chatroom').doc(chatroomId))
	.orderBy('timestamp', 'asc')
	.onSnapshot((snapshot) => {
		let messages = [];
		for (let i=0; i < snapshot.docs.length; ++i)
		{
			let doc = snapshot.docs[i];
			messages.push({
				id: doc.id,
				from: doc.data().from,
				message: doc.data().message,
				timestamp: doc.data().timestamp
			});
		}
		if (callbackFunction)
			callbackFunction(messages);

	})
}