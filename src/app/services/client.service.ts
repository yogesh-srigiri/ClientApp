import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Client } from '../models/Client';
import { map } from 'rxjs/operators';

@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) { 
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }

  getClients(): Observable<Client[]> {


this.clients = this.clientsCollection.snapshotChanges().pipe(
  map(actions => actions.map(a=>{
    const data = a.payload.doc.data() as Client;
    data.id = a.payload.doc.id;
    return data
  }))
);
return this.clients;

  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
  }

  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);

this.client = this.clientDoc.snapshotChanges().pipe(
  map(action =>{
    const data = action.payload.data() as Client;
    const id = action.payload.id;
    return {...data, id}

  })
);


return this.client;
    
}


updateClient(client: Client){
  this.clientDoc = this.afs.doc(`clients/${client.id}`);
  this.clientDoc.update(client)
}

deleteClient(client: Client){
  this.clientDoc = this.afs.doc(`clients/${client.id}`);
  this.clientDoc.delete()
}

}


   
  


