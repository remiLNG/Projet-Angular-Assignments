const bdInitialMatieres = [
  { id: 1, nom: 'Base de Données', professor_name: 'G.Mopolo', professor_img: 'https://www.fratmat.info/media/k2/items/cache/7a763ea01045fd6bbe9be20fa045d43a_XL.jpg' },
  { id: 2, nom: 'Technologies WEB', professor_name: 'M.Buffa', professor_img: 'https://pbs.twimg.com/profile_images/110455194/n666194627_2302_400x400.jpg' },
  { id: 3, nom: 'Veille Technologique', professor_name: 'S.Tounsi', professor_img: 'https://smartdeal06.departement06.fr/documents/_processed_/2/0/csm_smartdeal_experts_tounsi_cd27b91a2a.jpg' },
  { id: 4, nom: 'Reseau', professor_name: 'G.Menez', professor_img: 'https://cdn.discordapp.com/attachments/930362901401862164/932948708599926814/votrephoto.png' },
  { id: 5, nom: 'Communiquer pour Comvaincre', professor_name: 'F.Arnault', professor_img: 'https://pbs.twimg.com/profile_images/2347225535/FA_EURO_2004_400x400.jpg' },
];

const bdInitialAssignments = [
  { id: 1, nom: 'Projet Angular', auteur: 'Remi Longin', matiere: 2, dateDeRendu: '2022-01-30', remarque: '', note: undefined, rendu: false },
  { id: 2, nom: 'Projet Angular', auteur: 'Jean-Baptite Lognon', matiere: 2, dateDeRendu: '2022-01-30', remarque: '', note: undefined, rendu: false },
  { id: 3, nom: 'Projet Angular', auteur: 'Valentin Bordy', matiere: 2, dateDeRendu: '2022-01-30', remarque: 'Tres bon travail', note: undefined, rendu: true },
  { id: 4, nom: 'Projet Angular', auteur: 'Pierre Griseri', matiere: 2, dateDeRendu: '2022-01-30', remarque: 'Bon travail', note: undefined, rendu: true },
  { id: 5, nom: 'Projet Angular', auteur: 'Raphael Bolier', matiere: 2, dateDeRendu: '2022-01-30', remarque: '', note: undefined, rendu: false },
  { id: 6, nom: 'Entreprenariat', auteur: 'Remi Longin', matiere: 3, dateDeRendu: '2022-03-15', remarque: 'Excellent', note: undefined, rendu: true },
  { id: 7, nom: 'Entreprenariat', auteur: 'Jean-Baptite Lognon', matiere: 3, dateDeRendu: '2022-03-15', remarque: 'Excellent', note: undefined, rendu: true },
  { id: 8, nom: 'Entreprenariat', auteur: 'Valentin Bordy', matiere: 3, dateDeRendu: '2022-03-15', remarque: '', note: undefined, rendu: false },
  { id: 9, nom: 'Entreprenariat', auteur: 'Pierre Griseri', matiere: 3, dateDeRendu: '2022-03-15', remarque: '', note: undefined, rendu: false },
  { id: 10, nom: 'Entreprenariat', auteur: 'Raphael Bolier', matiere: 3, dateDeRendu: '2022-03-15', remarque: '', note: undefined, rendu: false },
];

export { bdInitialAssignments }
export { bdInitialMatieres }