import AsyncStorage from '@react-native-async-storage/async-storage';
import Airtable from 'airtable';
let base = new Airtable({apiKey: 'keyqsl9lpobPA145z'}).base('appNGiZwdughefkXj');

let base2 = new Airtable({apiKey: 'keyPYNAK0fL7aeyIp'}).base('appGqqGrUl0ID4xaa');


export var professeur = {
    id:'',
    nom: '',
    motDePasse: '',
    email:'',
    profilPic: '',
    IBAN:'',
    SIRET:'',
    adresse:'',
    contrat:true,
    //[[nom,etage,code,indice]]
    eleves: [],
    //[[id,date,mois,montant,etat]]
    factures: [],
    annonces : [''],
    //[[eleve,date,heure,tarif]]
    heures : []
}
export var mois = [[],[],[],[],[],[],[],[],[],[],[],[]];

{/*-- Get the students --*/}

export function refreshEleves(professeur) {
    let eleveInte = [];
    let filter = "({Email} = '" + professeur.email + "')";
    base2('Application Mentors').select({
        filterByFormula: filter
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) { 
            professeur.eleves = [];
            let i = 1;
            while (record.get('Student ' + String(i)) !== '' && record.get('Student ' + String(i)) !== undefined){
                professeur.eleves.push(['','','','','']);
                professeur.eleves[i-1][0] = record.get('Student ' + String(i));
                professeur.eleves[i-1][1] = record.get('School ' + String(i));
                professeur.eleves[i-1][2] = record.get('Task ' + String(i));
                professeur.eleves[i-1][3] = record.get('Price ' + String(i));
                professeur.eleves[i-1][4] = String(i);
                i+=1;          
            }
        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });

}



/* export var signOffLine = [false];
 */
//[id,send,titre,classe,ville,jour1,jour2,jour3,jour4,jour5,jour6,jour7]
export var annonces = [];

{/*-- GET --*/}

export async function getProfesseurData (user) {
    professeur.eleves=[];
    professeur.factures=[];
    let filter = "({Email} = '" + user + "')";
    base2('Application Mentors').select({
        filterByFormula: filter,
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) { 
            professeur.id = record.id;
            professeur.nom =  record.get('Name');
            professeur.motDePasse =  record.get('Password')[0];
            professeur.email =  record.get('Email')[0];
            professeur.SIRET = record.get('SIRET');
            professeur.IBAN = record.get('IBAN');
            professeur.adresse = record.get('Postal address');
            professeur.annonces = record.get('anouncesStr');
            professeur.contrat = true;
            professeur.profilPic = "http://cdn.onlinewebfonts.com/svg/img_569204.png";
            let i =1;
            while (record.get('Student ' + String(i)) !== '' && record.get('Student ' + String(i)) !== undefined){
                professeur.eleves.push(['','','','','']);
                professeur.eleves[i-1][0] = record.get('Student ' + String(i));
                professeur.eleves[i-1][1] = record.get('School ' + String(i));
                professeur.eleves[i-1][2] = record.get('Task ' + String(i));
                professeur.eleves[i-1][3] = record.get('Price ' + String(i));
                professeur.eleves[i-1][4] = String(i);
                i+=1;
            }
        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    professeur.annonces.push('')
}

export function utiliseApp(professeur){
    base('Application Mentors').update(professeur.id, 
        { 
            "User": true
        })
}

export function addCE(professeur, eleve, date, task,id, tarif) {
    base2('Application Tasks').create([
        {
          "fields": {
            "Name": professeur,
            "Student": eleve,
            "Date": date,
            "Task": task,
            "Price": tarif,
            "Mentor": [
                id
              ]
          }
        },
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
      });
}

export async function getCoursHisto(user) {
    professeur.heures=[];
    let filter = "({Email} = '" + user + "')";
    let k = 0;
    base2('Application Tasks').select({
        filterByFormula: filter,
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) { 
            professeur.heures.push(['','','','','']);
            professeur.heures[k][0] = record.get('Student');
            professeur.heures[k][1] = record.get('Date Full');
            professeur.heures[k][2] = record.get('Task');
            professeur.heures[k][3] = record.get('Price');
            professeur.heures[k][4] = record.get('Id');
            k+=1;
        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    
    professeur.heures = professeur.heures.filter(item => item !== '');
}

export function triCoursHisto(listeHeures) {
    mois = [[],[],[],[],[],[],[],[],[],[],[],[]];
    for(cours in listeHeures){
        if(listeHeures[cours][1].includes("/01/")){
            mois[0].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/02/")){
            mois[1].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/03/")){
            mois[2].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/04/")){
            mois[3].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/05/")){
            mois[4].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/06/")){
            mois[5].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/07/")){
            mois[6].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/08/")){
            mois[7].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/09/")){
            mois[8].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/10/")){
            mois[9].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/11/")){
            mois[10].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/12/")){
            mois[11].push(listeHeures[cours]);
        }
        
    }
}

{/*-- ADD --*/}

export function addFacture(professeur,id, nh1_1, th1_1, nh1_2, th1_2, nh1_3, th1_3, nh1_4, th1_4) {

    base2('Application Bills').create([ 
        { 
            "fields":{
                "Mentors": [
                    id
                  ],
                'Mock' : nh1_1,
                'Price / Mock' : th1_1,
                'Cohort course' : nh1_2,
                'Price / Cohort course' : th1_2,
                'CV / CL' : nh1_3,
                'Price / CV / CL' : th1_3,
                'Follow up' : nh1_4,
                'Price / Follow up' : th1_4,
                'Status' : "Pending"
        }  
    } 
    ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
      });
}

export function getFactures(Nom){
    let facturesInter = [];
   // professeur.factures = [];
    let filter = "({Name} = '" + Nom + "')";
    base2('Application Bills').select({
        filterByFormula: filter,
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) { 
            //[[id,date,mois,montant,etat]]
            //professeur.factures.push([record.id,record.get('Date'),record.get('Month'),record.get('Total')+'£',record.get('Status')]);
            facturesInter.push([record.id,record.get('Date'),record.get('Month'),'£'+record.get('Total'),record.get('Status')]);
            professeur.factures = facturesInter

        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

export function refreshcand(professeur){
    let filter = "({Email} = '" + professeur.email + "')";
    base2('Application Mentors').select({
        filterByFormula: filter,
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) { 
            professeur.annonces = record.get('anouncesStr');
        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

export function refreshAnnonces() {
    //annonces = [id,send,titre,classe,ville,jour1,jour2,jour3,jour4,jour5,jour6,jour7,recID]
    annonces = [];
    let i = 0;
    base2('Announcements').select({
        maxRecords: 100,
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if(record.get('Disable') !== true){
                annonces.push(['','','','','','','','','','','','','','','','']); 
                annonces[i][0]=String(record.get('Id'));
                annonces[i][1]=record.get('Disable');
                annonces[i][2]=record.get('Student');
                annonces[i][3]=record.get('School');
                annonces[i][4]=record.get('Speciality');
                annonces[i][5]=record.get('Task');
                annonces[i][6]=record.get('Compensation');
                annonces[i][7]=record.get('Discord ID');
                annonces[i][8]=record.get('Time');
                annonces[i][9]=record.get('Work');
                annonces[i][10]=record.get('Interview Company');
                annonces[i][11]=record.get('Interview Date');

                annonces[i][12]=record.get('Interview Language');
                annonces[i][13]=record.get('Interview Job');
                annonces[i][14]=record.get('More Details');

                annonces[i][15]=record.id;
                i+=1;
            }
        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

export function addCandidat(professeur,num){
    let filter = "({Id} = '" + num + "')";
    var candidats = [];
    let id_C = 0;
    let c = 0;
    setTimeout(() => {
    base2('Announcements').select({
        filterByFormula: filter
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            id_C = record.id
            candidats.push(record.get('Candidates'))
            
            if(typeof record.get('Candidates') == 'undefined'){
                candidats = [[professeur.id]];
            }else{
                candidats[0].push(professeur.id);
            }
            c = 1;
        });
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    },1000);
    setTimeout(() => {
    if(c == 1){ 
        return(addCandidat2(candidats,id_C));
    }},2000);
}

export function addCandidat2(candidats,id_C){
    setTimeout(() => {
        base2('Announcements').update(id_C,
            {
                "Candidates": 
                    candidats[0]
                
              });},200);
              refreshAnnonces();
}

export function changeInfo(professeur, siret, iban, adresse) {
    setTimeout(() => {
    base2('Application Mentors').update(professeur.id, 
        { 
            'SIRET' : siret,
            'IBAN' : iban,
            'Postal address' : adresse
        })
    },1000);
    setTimeout(() => {
    getProfesseurData(professeur.email);},1000);
}

export function deleteMentor(professeur) {
    setTimeout(() => {
    base2('Application Mentors').update(professeur.id, 
        { 
            'SIRET' : 'delete',
            'IBAN' : 'delete',
            'Postal address' : 'delete'
        })
    },1000);
}

{/*-- OLD -- OLD -- OLD -- OLD -- OLD -- OLD -- OLD -- OLD -- OLD -- OLD -- OLD -- OLD -- OLD -- OLD -- OLD -- OLD -- OLD --*/}

export async function getProfesseurData2 (user) {
    professeur.eleves=[];
    professeur.factures=[];
    let filter = "({E-mail} = '" + user + "')";
    base('Application-Prof').select({
        filterByFormula: filter,
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) { 
            professeur.id = record.id;
            professeur.nom =  record.get('Name');
            professeur.motDePasse =  record.get('Mot de passe');
            professeur.email =  record.get('E-mail');
            professeur.SIRET = record.get('SIRET');
            professeur.IBAN = record.get('IBAN');
            professeur.adresse = record.get('Adresse');
            professeur.annonces = record.get('listAnnonces');
            professeur.contrat = record.get('Contrat');
            let img =  record.get('Photo de profil');
            professeur.profilPic = img[0].thumbnails.large.url;
            let i =1;
            while (record.get('Eleve ' + String(i)) !== '' && record.get('Eleve ' + String(i)) !== undefined){
                professeur.eleves.push(['','','','','']);
                professeur.eleves[i-1][0] = record.get('Eleve ' + String(i));
                professeur.eleves[i-1][1] = record.get('Code ' + String(i));
                professeur.eleves[i-1][2] = record.get('Etage ' + String(i));
                professeur.eleves[i-1][3] = record.get('Tarif ' + String(i));
                professeur.eleves[i-1][4] = String(i);
                i+=1;
            }
        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

export function checkFact(user){
    let ibanInte = '';
    let siretInte  ='';
    let adresseInte = '';
    let filter = "({E-mail} = '" + user + "')";
    base('Application-Prof').select({
        filterByFormula: filter,
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) { 
            siretInte = record.get('SIRET');
            ibanInte = record.get('IBAN');
            adresseInte = record.get('Adresse');
         }
        );
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    if(ibanInte !== '' && siretInte !== '' && adresseInte !== ''){
        return true;
    }else{
        return false;
    }
}

export function getFactures2(Nom){
    professeur.factures = [];
    let filter = "({Name} = '" + Nom + "')";
    base('Application-Factures').select({
        filterByFormula: filter,
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) { 
            //[[id,date,mois,montant,etat]]
            professeur.factures.push([record.id,record.get('Date'),record.get('Mois'),record.get('TOTAL')+'€',record.get('Statut')]);
        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

export async function getCoursHisto2(user) {
    professeur.heures=[];
    let filter = "({E-mail} = '" + user + "')";
    let k = 0;
    base('Application-Heures').select({
        filterByFormula: filter,
        view: "Appli",
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) { 
            professeur.heures.push(['','','','','']);
            professeur.heures[k][0] = record.get('Eleve');
            professeur.heures[k][1] = record.get('DateFull');
            professeur.heures[k][2] = record.get('TempsCours');
            professeur.heures[k][3] = record.get('Tarif');
            professeur.heures[k][4] = record.get('Id');
            k+=1;
        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    
    professeur.heures = professeur.heures.filter(item => item !== '');
}


/* 
split mois:
for(cours in heures){if(heures[cours].includes("/11/")){console.log(heures[cours])}}

filtre date:
heures.filter(item => item[0] !== '').sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  }) 
*/

export function triCoursHisto2(listeHeures) {
    mois = [[],[],[],[],[],[],[],[],[],[],[],[]];
    for(cours in listeHeures){
        if(listeHeures[cours][1].includes("/01/")){
            mois[0].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/02/")){
            mois[1].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/03/")){
            mois[2].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/04/")){
            mois[3].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/05/")){
            mois[4].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/06/")){
            mois[5].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/07/")){
            mois[6].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/08/")){
            mois[7].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/09/")){
            mois[8].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/10/")){
            mois[9].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/11/")){
            mois[10].push(listeHeures[cours]);
        }else if(listeHeures[cours][1].includes("/12/")){
            mois[11].push(listeHeures[cours]);
        }
        
    }
}


{/*-- ADD --*/}

export function addEleve(professeur, nom, code, etage) {
    let num = professeur.eleves.length + 1;
    let eleveField = 'Eleve ' + String(num);
    let codeField = 'Code ' + String(num);
    let etageField = 'Etage ' + String(num);
    setTimeout(() => {
    base('Application-Prof').update(professeur.id, 
        { 
            [eleveField] : nom,
            [codeField] : code,
            [etageField] : etage
        })
    },1000);
    setTimeout(() => {
    refreshEleves(professeur);},1000);
}



export function addSignature(professeur, uri) {
 
    base('Application-Prof').update(professeur.id, 
        { 
            'Contrat_base64' : uri,
            'Contrat' : true
                
    })
}



export function modifEleve(professeur,num,code,etage) {
    //let eleveField = 'Eleve ' + String(num);
    let codeField = 'Code ' + String(num);
    let etageField = 'Etage ' + String(num);
    setTimeout(() => {
    base('Application-Prof').update(professeur.id, 
        { 
            [codeField] : code,
            [etageField] : etage
        })
    },1000);
}


export function addFacture2(professeur,id, nh1_1, th1_1, nh1_2, th1_2, nh1_3, th1_3) {

    base('Application-Factures').create([ 
        { 
            "fields":{
                "Name": professeur,
                "Professeur": [
                    id
                  ],
                'NH1-1' : nh1_1,
                'TH1-1' : th1_1,
                'NH1-2' : nh1_2,
                'TH1-2' : th1_2,
                'NH1-3' : nh1_3,
                'TH1-3' : th1_3,
                'Statut' : "En attente"
        }  
    } 
    ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
      });
}

export function addMessage(professeur,msg) {

    base('Application-SAV').create([ 
        { 
            "fields":{
                "Name": professeur.nom,
                'E-mail' : professeur.email,
                'Message' : msg
        }  
    } 
    ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
      });
}


export function delEleve(professeur,indice) {
    let num = professeur.eleves[indice-1][3];
    let eleveField = 'Eleve ' + String(num);
    let codeField = 'Code ' + String(num);
    let etageField = 'Etage ' + String(num);
    base('Application-Prof').update(professeur.id, 
        { 
            [eleveField] : '',
            [codeField] : '',
            [etageField] : ''
        })
    refreshEleves(professeur);
      
}

export function utiliseApp2(professeur){
    base('Application-Prof').update(professeur.id, 
        { 
            "Utilisateur": true
        })
}

export function addCE2(professeur, eleve, date, temps,id, tarif) {
    base('Application-Heures').create([
        {
          "fields": {
            "Name": professeur,
            "Eleve": eleve,
            "Date": date,
            "Duree": temps,
            "TarifH": tarif,
            "Professeur": [
                id
              ]
          }
        },
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
      });
}

export function addCandidat21(professeur,num){
    let filter = "({Numero} = '" + num + "')";
    var candidats = [];
    let id_C = 0;
    let c = 0;
    setTimeout(() => {
    base('Annonces').select({
        filterByFormula: filter
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            id_C = record.id
            candidats.push(record.get('Candidatures'))
            
            if(typeof record.get('Candidatures') == 'undefined'){
                candidats = [[professeur.id]];
            }else{
                candidats[0].push(professeur.id);
            }
            c = 1;
        });
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    },1000);
    setTimeout(() => {
    if(c == 1){
        return(addCandidat2(candidats,id_C));
    }},2000);
}

export function addCandidat22(candidats,id_C){
    setTimeout(() => {
        base('Annonces').update(id_C,
            {
                "Candidatures": 
                    candidats[0]
                
              });},200);
              refreshAnnonces();
}

export function delCandidat(professeur,num){
    let filter = "({Numero} = '" + num + "')";
    var candidats = [];
    let id_C = 0;
    let c = 0;
    setTimeout(() => {
    base('Annonces').select({
        filterByFormula: filter
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            id_C = record.id
            candidats.push(record.get('Candidatures'))
       
            if(typeof record.get('Candidatures') == 'undefined'){

                return;
            }else{
                candidats[0].filter(item => item !== professeur.id);
         
            }
            c = 1;
        });
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    },1000);
    setTimeout(() => {
    if(c == 1){
        return(addCandidat2(candidats,id_C));
    }},2000);
}

export function changeInfo2(professeur, siret, iban, adresse) {
    setTimeout(() => {
    base('Application-Prof').update(professeur.id, 
        { 
            'SIRET' : siret,
            'IBAN' : iban,
            'Adresse' : adresse
        })
    },1000);
    setTimeout(() => {
    getProfesseurData(professeur.email);},1000);
}
{/*-- REFRESH --*/}

export function refreshEleves2(professeur) {
    let eleveInte = [];
    let filter = "({E-mail} = '" + professeur.email + "')";
    base('Application-Prof').select({
        filterByFormula: filter
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) { 
            let i = 1;
            while (record.get('Eleve ' + String(i)) !== '' && record.get('Eleve ' + String(i)) !== undefined){
                eleveInte.push(['','','','','']);
                eleveInte[i-1][0] = record.get('Eleve ' + String(i));
                eleveInte[i-1][1] = record.get('Code ' + String(i));
                eleveInte[i-1][2] = record.get('Etage ' + String(i));
                eleveInte[i-1][3] = record.get('Tarif ' + String(i));
                eleveInte[i-1][4] = String(i);
                i+=1;          
            }
            professeur.eleves = eleveInte;
        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });

}
export function refreshcand2(professeur){
    let filter = "({E-mail} = '" + professeur.email + "')";
    base('Application-Prof').select({
        filterByFormula: filter,
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) { 
            professeur.annonces = record.get('listAnnonces');
        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

export function refreshAnnonces2() {
    //annonces = [id,send,titre,classe,ville,jour1,jour2,jour3,jour4,jour5,jour6,jour7,recID]
    annonces = [];
    let i = 0;
    base('Annonces').select({
        maxRecords: 1000,
        view: "Annonces"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if(record.get('Active') === false){
                annonces.push(['','','','','','','','','','','','','']); 
                annonces[i][0]=String(record.get('Numero'));
                annonces[i][1]=record.get('Active');
                annonces[i][2]=record.get('Intitulé');
                annonces[i][3]=record.get('Classe');
                annonces[i][4]=record.get('Ville copie');
                annonces[i][5]=record.get('Jour 1');
                annonces[i][6]=record.get('Jour 2');
                annonces[i][7]=record.get('Jour 3');
                annonces[i][8]=record.get('Jour 4');
                annonces[i][9]=record.get('Jour 5');
                annonces[i][10]=record.get('Jour 6');
                annonces[i][11]=record.get('Jour 7');
                annonces[i][12]=record.id;
                i+=1;
            }
        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}
export function cleanAnnonces(annonces){
    for(let num in annonces){
        if (annonces[num] === ['','','','','','','','','','','','']){
            annonces.splice(num, 1);
        }
    }
}

function cleanProfesseur(professeur){
    for(let elv in professeur.eleves){
        if (professeur.eleves[elv] === ['','','','']){
            professeur.eleves.splice(elv, 1);
        }
    }
}

{/*--- Persistance Data ---*/}

export async function delDataLogin(){
    await AsyncStorage.setItem("usernameStk",'');
    await AsyncStorage.setItem("passwordStk",'');
}