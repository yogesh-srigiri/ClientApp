import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate{
constructor(
private router: Router,
private afAuth: AngularFireAuth
){}

canActivate(): Observable<boolean>{
 
return this.afAuth.authState.pipe(
    map(auth =>{
        if(!auth){
            this.router.navigate(['/login']);
            return false;
        }else{
            return true;
        }
    })
)


//     this.clientDoc = this.afs.doc<Client>(`clients/${id}`);

// this.client = this.clientDoc.snapshotChanges().pipe(
//   map(action =>{
//     const data = action.payload.data() as Client;
//     data.id = action.payload.id;
//     return data

//   })
// );

}

}