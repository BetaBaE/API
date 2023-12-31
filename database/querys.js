exports.Fournisseurs = {
  getAll: `SELECT * FROM [dbo].[CMT_Fournisseurs]`,

  getallfournisseurwithecheanceLoi: `
  select * from DAF_FOURNISSEURS
where id in(SELECT
      [idfournisseur]
  FROM [dbo].[DAF_echeanceloiFournisseur])
  `,

  //   getAllFournisseurs: `SELECT fou.id, fou.addresse, fou.CodeFournisseur, fou.Identifiantfiscal, fou.ICE, fou.nom,
  //   echr.modalitePaiement as echeancereel ,
  //   echl.modalitePaiement as echeanceloi,
  //   fou.mail
  // FROM DAF_FOURNISSEURS fou
  // LEFT JOIN (
  // SELECT idfournisseur, MAX(id) as id
  // FROM DAF_echeanceloiFournisseur
  // GROUP BY idfournisseur
  // ) AS echl_max
  // ON fou.id = echl_max.idfournisseur

  // LEFT JOIN DAF_echeanceloiFournisseur echl
  // ON echl.id = echl_max.id

  // LEFT JOIN (
  // SELECT idfournisseur, MAX(id) as id
  // FROM DAF_echeanceReelFournisseur
  // GROUP BY idfournisseur
  // ) AS echr_max
  // ON fou.id = echr_max.idfournisseur

  // LEFT JOIN DAF_echeanceReelFournisseur echr
  // ON echr.id = echr_max.id
  // where 1=1 `,
  getFournisseursCount: `SELECT COUNT(*) as count FROM [dbo].[CMT_Fournisseurs]`,

  createFournisseur: `INSERT INTO CMT_FOURNISSEURS(CodeFournisseur,nom,ICE,Identifiantfiscal,mail,addresse)
     VALUES(@CodeFournisseur, @nom,@ICE,@IF,@mail,@addresse)`,
  RibsFournisseurValid: `select f.nom, rf.* from [dbo].[CMT_FOURNISSEURS] f, [dbo].[CMT_RIB_Fournisseurs] rf
  where f.id = rf.FournisseurId and rf.validation = 'Validé'`,
  FournisseursRibValid: `SELECT f.CodeFournisseur, f.nom, rf.* FROM  [dbo].[CMT_FOURNISSEURS] f, [dbo].[DAF_RIB_Fournisseurs] rf
  where f.id = rf.FournisseurId
  AND rf.validation = 'validé' AND f.nom not in (SELECT
 distinct [NOM]
  FROM [dbo].[DAF_LOG_FACTURE] WHERE etat!='Annulé'  and ModePaiementID =@ovId)`,
  getOne: `select * from CMT_FOURNISSEURS where id=@id`,
  update: `update CMT_FOURNISSEURS 
  set 
     ICE=@ICE,
     Identifiantfiscal=@IF,
     mail=@mail,
     addresse=@addresse
      where id=@id
  `,
};

exports.ribTemporaire = {
  getRibs: `SELECT rt.*, f.nom as fournisseur FROM [dbo].[CMT_RIB_TEMPORAIRE] rt, [dbo].[CMT_Fournisseurs] f WHERE rt.fournisseurid = f.id AND  1=1`,
  getRibCount: `SELECT COUNT(*) as count FROM [dbo].[CMT_RIB_TEMPORAIRE]`,
  createRibs: `INSERT INTO [dbo].[CMT_RIB_TEMPORAIRE](FournisseurId,rib,swift,banque)
     VALUES( @FournisseurId,@rib,@swift,@banque )`,
};

exports.ribFournisseur = {
  create: `INSERT INTO [dbo].[CMT_RIB_Fournisseurs]
           ([FournisseurId]
           ,[rib]
           ,[swift]
           ,[banque]
           )
     VALUES
           (@FournisseurId,
           @rib
           ,@swift
           ,@banque
          )`,
  getAll: `SELECT rf.*, f.nom as fournisseur FROM CMT_RIB_Fournisseurs rf, CMT_Fournisseurs f   WHERE rf.fournisseurid = f.id AND  1=1`,
  getCount: `SELECT COUNT(*) as count FROM CMT_RIB_Fournisseurs`,
  edit: `UPDATE CMT_RIB_Fournisseurs
      SET FournisseurId = @FournisseurId
      ,rib = @rib
      ,swift=@swift
      ,banque=@banque
      ,validation = @validation
    WHERE id = @id `,
  getOne: `SELECT rf.*, f.nom as fournisseur FROM CMT_RIB_Fournisseurs rf, CMT_Fournisseurs f   WHERE rf.fournisseurid = f.id AND  rf.id = @id`,
  RibsValid: `select * from CMT_RIB_Fournisseurs where validation = 'Validé'`,
  ribfournisseursvalid: `distinct SELECT * FROM CMT_RIB_Fournisseurs
  where validation = 'Validé'`,
};

exports.ribAtner = {
  getAll: `SELECT * FROM [dbo].[CMT_RIB_ATNER]`,
  getCount: `SELECT COUNT(*) as count FROM [dbo].[CMT_RIB_ATNER]`,
  create: `INSERT INTO [dbo].[CMT_RIB_ATNER]
           ([nom]
           ,[rib])
     VALUES
           (@nom
           ,@rib)`,
  update: `UPDATE [dbo].[CMT_RIB_ATNER]
   SET [nom] = @nom
      ,[rib] = @rib
 WHERE id = @id `,
  getOne: `SELECT * FROM [dbo].[CMT_RIB_ATNER] WHERE id = @id`,
};

exports.Users = {
  create: `INSERT INTO [dbo].[DAF_USER]
            ([fullname]
            ,[username]
            ,[Role]
            ,[hached_password]
            ,[salt])
           VALUES
            (@fullname
            ,@username
            ,@Role
            ,@hached_password
            ,@salt)`,

  update: `UPDATE [dbo].[DAF_USER]
    SET [fullname] = @fullname
      ,[username] = @username
      ,[Role] = @Role
      ,[isActivated] = @isActivated
    WHERE id = @id`,
  getCount: `SELECT COUNT(*) as count FROM [dbo].[DAF_USER]`,
  getAll: `SELECT * FROM [dbo].[DAF_USER] where 1=1 `,
  getOne: `SELECT * FROM [dbo].[DAF_USER] WHERE id = @id`,
  getOneUsename: `SELECT * FROM [dbo].[DAF_USER] WHERE username = @username`,
};

exports.ordervirements = {
  getfacturebyordervirement: `SELECT * FROM DAF_SuivieFacture
  WHERE ordervirementId LIKE '%'+@id+'%';`,
  getCountByYear: `SELECT  COUNT(*) +1 as count
  FROM [dbo].[DAF_Order_virements]
  where datecreation like '%${new Date().getFullYear()}%'`,
  getCount: `SELECT COUNT(*) as count FROM [dbo].[DAF_Order_virements]`,
  create: `INSERT INTO [dbo].[DAF_Order_virements]
           ([id],
            [directeursigne]
           ,[ribAtner]
          )
     VALUES
           (@id,
            @directeursigne
           ,@ribAtner
           )`,
  getAll: `SELECT  ov.*, ra.nom, ra.rib
  FROM [dbo].[DAF_Order_virements] ov,[dbo].[DAF_RIB_ATNER] ra
  where ov.ribAtner = ra.id `,
  getOne: `SELECT  ov.*, ra.nom, ra.rib
  FROM [dbo].[DAF_Order_virements] ov,[dbo].[DAF_RIB_ATNER] ra
  where ov.ribAtner = ra.id and ov.id = @id`,
  update: `UPDATE [dbo].[DAF_Order_virements]
   SET [ribAtner] = @ribAtner,
   [directeursigne]=@directeursigne
      ,[etat] = @etat
  WHERE id = @id`,
  orderVirementsEnCours: `SELECT * FROM [dbo].[DAF_Order_virements]
  WHERE etat = 'En cours'`,
  orderVirementsEtat: `SELECT * FROM [dbo].[DAF_Order_virements]
  WHERE etat in('En cours')
  and total <> 0`,
  AddToTotal:
    "update [DAF_Order_virements] set total = total+@montantVirement where id =@id",
  MiunsFromTotal:
    "update [DAF_Order_virements] set total = total-@montantVirement where id =@id",
  getHeaderPrint: `SELECT  ov.*, ra.nom, ra.rib
  FROM [dbo].[DAF_Order_virements] ov,[dbo].[DAF_RIB_ATNER] ra
  where ov.ribAtner = ra.id and ov.id = @ovId`,
  getBodyPrint: `
      SELECT v.[id]
      ,[orderVirementId]
      ,f.nom
      ,rf.rib
      ,[montantVirement],
      v.Etat
  FROM  [dbo].[DAF_VIREMENTS] v ,
      [dbo].[DAF_RIB_Fournisseurs] rf,
      [dbo].[DAF_FOURNISSEURS] f
  where v.fournisseurId = f.id
    and v.ribFournisseurId = rf.id
    and Etat = 'En cours'
    and [orderVirementId] = @ovId`,
  updateVirements: `update [dbo].[DAF_Order_virements] set Etat = 'Reglee'
                      where id = @id`,

  updateLogFacture: `update [dbo].[DAF_LOG_FACTURE] set Etat = 'Reglee'
                        where ModePaiementID = @id`,

  updateDateExecution: `update [dbo].[DAF_Order_virements] set dateExecution = GETDATE()
                            where id = @id`,

  updatvirementRegler: `update [dbo].[DAF_VIREMENTS] set Etat = 'Reglee'
                            where orderVirementId = @id
                            and   etat<>'Annuler'
                            `,

  updateVirementsAnnuler: `update [dbo].[DAF_VIREMENTS] set Etat = 'Annuler'
                      where orderVirementId = @id`,

  updateLogFactureAnnuler: `update [dbo].[DAF_LOG_FACTURE] set Etat = 'Annulé'
                        where ModePaiementID = @id`,
  updateordervirementAnnuler: `update [dbo].[DAF_Order_virements] set Etat = 'Annule' ,
                        total = 0
                        where id = @id`,
};

exports.factures = {
  getCount: `SELECT COUNT(*) as count FROM [dbo].[CMT_Facture]`,
  getAll: `SELECT * FROM [dbo].[CMT_Facture] where 1=1 `,
  getOne: `SELECT * FROM [dbo].[CMT_Facture] where id=@id`,
  getAllFactures: `SELECT * FROM [dbo].[CMT_Facture] `,
  createfacture: `INSERT INTO [dbo].[CMT_Facture]
           ([id]
           ,[NumeroFacture]
           ,[BonCommande]
           ,[IdFournisseur]
           ,[DateFacture]
           ,[DateEcheance]
           ,[ReferenceAvanace]
           ,[MontantHT]
           ,[MontantTVA]
           ,[MontantTTC]
           ,[Redacteur]
           ,[VerifiyMidelt]
           ,[IdDesignation]
           ,[Chantier]
           ,[NetAPayer]
           ,[Etat]
          )
     VALUES
           (@id
           ,@NumeroFacture
           ,@BonCommande
           ,@IdFournisseur
           ,@DateFacture
           ,@DateEcheance
           ,@ReferenceAvanace
           ,@MontantHT
           ,@MontantTVA
           ,@MontantTTC
           ,@Redacteur
           ,@VerifiyMidelt
           ,@IdDesignation
           ,@Chantier
           ,@NetAPayer
           ,@Etat)
`,

  updateFacture: `UPDATE [dbo].[CMT_Facture] set NumeroFacture = @NumeroFacture
      ,BonCommande = @BonCommande
      ,IdFournisseur = @IdFournisseur
      ,DateFacture = @DateFacture
      ,DateEcheance = @DateEcheance 
      ,ReferenceAvanace = @ReferenceAvanace
      ,MontantHT = @MontantHT
      ,MontantTVA = @MontantTVA
      ,MontantTTC = @MontantTTC
      ,Redacteur = @Redacteur
      ,VerifiyMidelt = @VerifiyMidelt
      ,IdDesignation = @IdDesignation
      ,Chantier = @Chantier
      ,NetAPayer = @NetAPayer
      ,Etat = @Etat
  WHERE id = @id
  and VerifiyMidelt = Non`,

  getfacturebyfournisseurid: `Select fa.* from [dbo].[DAF_FOURNISSEURS] f,[dbo].[DAF_Facture_Avance_Fusion] fa
  where
  f.id=@id and not
  EXISTS (SELECT  CODEDOCUTIL,nom
  FROM [dbo].[DAF_LOG_FACTURE] lf
  where fa.CODEDOCUTIL=lf.CODEDOCUTIL
  and lf.etat <>'Annulé'
  and fa.nom=lf.NOM
 )and  fa.nom=f.nom
  order by fa.DateFacture
  `,
  getficheNavetebyfournisseur: `SELECT fa.*
  FROM [dbo].[DAF_FOURNISSEURS] f
  INNER JOIN [dbo].[DAF_factureNavette] fa ON f.id = @id
  WHERE fa.idfacturenavette NOT IN (SELECT idAvance FROM [dbo].[DAF_LOG_FACTURE])

`,
};

exports.virements = {
  create: `
  INSERT INTO [dbo].[DAF_VIREMENTS]
      (
       [fournisseurId]
      ,[ribFournisseurId]
      ,[orderVirementId]
      ,[montantVirement])
  VALUES
      (
       @fournisseurId
      ,@ribFournisseurId
      ,@orderVirementId
      ,@montantVirement
      )`,
  getCount: "SELECT COUNT(*) as count FROM [dbo].[DAF_VIREMENTS]",
  getAll: `
  SELECT v.[id]
      ,[orderVirementId]
      ,f.nom
      ,rf.rib
      ,[montantVirement],
      v.Etat,
      v.dateoperation
  FROM  [dbo].[DAF_VIREMENTS] v ,
      [dbo].[DAF_RIB_Fournisseurs] rf,
      [dbo].[DAF_FOURNISSEURS] f
  where v.fournisseurId = f.id
    and v.ribFournisseurId = rf.id
    and 1=1
  `,
  getDataFromLogFacture: `SELECT * FROM [dbo].[DAF_Facture_Avance_Fusion] where 1=1 `,
  createLogFacture: `
 INSERT INTO [dbo].[DAF_LOG_FACTURE]
           ([CODEDOCUTIL]
           ,[CODECHT]
            ,[NOM]
           ,[LIBREGLEMENT]
           ,[DATEDOC]
           ,[TOTALTTC]
           ,[TOTHTNET]
           ,[TOTTVANET]
           ,[NETAPAYER]
           ,[ModePaiementID]
           ,[modepaiement],
           [idAvance])
     VALUES`,
  update: `Update [dbo].[DAF_VIREMENTS]
            set Etat=@Etat,
            dateOperation=@dateOperation
            where id=@id`,
  getOne: `
  SELECT v.[id]
      ,[orderVirementId]
      ,f.nom
      ,rf.rib
      ,[montantVirement],
      v.Etat
  FROM  [dbo].[DAF_VIREMENTS] v ,
      [dbo].[DAF_RIB_Fournisseurs] rf,
      [dbo].[DAF_FOURNISSEURS] f
  where v.fournisseurId = f.id
    and v.ribFournisseurId = rf.id
    and v.[id] = @id
 `,

  updateLogFactureWhenAnnuleV:
    "update [dbo].[DAF_LOG_FACTURE] set Etat = 'Annulé' where [ModePaiementID] =@orderVirementId and nom=@nom",
};

exports.logFactures = {
  getLogFactureCount: `SELECT COUNT(*) as count
FROM [dbo].[DAF_LOG_FACTURE] lf 
INNER JOIN [dbo].[DAF_factureNavette] fn ON 
  CASE 
    WHEN lf.idAvance LIKE 'av%' THEN TRY_CAST(SUBSTRING(lf.idAvance, 3, LEN(lf.idAvance)) AS INT)
    ELSE lf.idAvance
  END = fn.idfacturenavette
INNER JOIN [dbo].[DAF_FOURNISSEURS] fou ON fou.id = fn.idfournisseur 
INNER JOIN chantier ch ON ch.id = fn.codechantier

    `,
  getLogFactures: `SELECT DISTINCT
  fn.Bcommande,
  fn.montantAvance,
  fn.idfacturenavette as id,
  fou.CodeFournisseur,
  fou.nom,
  ch.LIBELLE,
  ch.id as codechantier,
  lf.etat,
  lf.modepaiement,
  fn.ficheNavette
FROM [dbo].[DAF_LOG_FACTURE] lf 
INNER JOIN [dbo].[DAF_factureNavette] fn ON 
  CASE 
    WHEN lf.idAvance LIKE 'av%' THEN TRY_CAST(SUBSTRING(lf.idAvance, 3, LEN(lf.idAvance)) AS INT)
    ELSE lf.idAvance
  END = fn.idfacturenavette
INNER JOIN [dbo].[DAF_FOURNISSEURS] fou ON fou.id = fn.idfournisseur 
INNER JOIN chantier ch ON ch.id = fn.codechantier

  
  `,
};
exports.chantiers = {
  getAll: `select * from [dbo].[CMT_Chantier] `,
  getChantiers: "select * from [dbo].[CMT_Chantier]",
  getcountChantier: "select count(*) from [dbo].[CMT_Chantier]",
  getChantiersbyfactureid: `SELECT * from chantier
  where  id in(
  select codechantier from DAF_FactureSaisie
  where id=@id
  ) `,
  getChantierbyBc: `select ch.LIBELLE as libelleChantier ,REDACTEUR  from DAf_BonCommande_facture bc inner join chantier ch
  on ch.CODEAFFAIRE=bc.CODEAFFAIRE
  where bc.CODEDOCUTIL=@Boncommande
  `,
};

exports.factureSaisie = {
  // getTTc: `SELECT TTC FROM DAF_FactureSaisie WHERE id = @idFacture`,

  getfactureSaisie: `SELECT * FROM [dbo].[CMT_Facture] f
INNER JOIN [dbo].[CMT_FactureDesignation] d on d.id=f.iddesignation
INNER JOIN [dbo].[CMT_Fournisseurs] fou on fou.id=f.idfournisseur
LEFT JOIN [dbo].[CMT_Chantier] ch on ch.id=f.chantier
WHERE deletedAt is null
`,
  getfactureSaisiecount: `
SELECT COUNT(*) as count
FROM [dbo].[CMT_Facture] f
inner join [dbo].[CMT_FactureDesignation] d on d.id=f.iddesignation
inner join  [dbo].[CMT_Fournisseurs] fou on fou.id=f.idfournisseur
where deletedAt is null`,
  createfacture: `INSERT INTO [dbo].[DAF_FactureSaisie](
  [numeroFacture]
,[BonCommande]
,[TTC]
,[idfournisseur]
,[DateFacture]
,[iddesignation]
,[fullName],
[codechantier],
[dateecheance]
)
  values  (
     @numeroFacture
    ,@BonCommande
    ,@TTC
    ,@idfournisseur
    ,@DateFacture
    ,@iddesignation
    ,@fullName
    ,@codechantier
    ,@dateEcheance
    )`,
  getOne: `SELECT * FROM [dbo].[CMT_Facture] f
  INNER JOIN [dbo].[CMT_FactureDesignation] d on d.id=f.iddesignation
  INNER JOIN [dbo].[CMT_Fournisseurs] fou on fou.id=f.idfournisseur
  LEFT JOIN [dbo].[CMT_Chantier] ch on ch.id=f.chantier
  WHERE deletedAt is null and f.id=@id`,

  alreadyexist:
    "select count(*) from  [dbo].[DAF_FactureSaisie] where numeroFacture =@numeroFacture and BonCommande =@BonCommande",
  delete: `UPDATE [dbo].[DAF_FactureSaisie]
  SET  deletedAt=getDate(),
  numeroFacture='----'+CAST(id as varchar(20))  +'----'

   WHERE id = @id `,

  edit: `UPDATE [dbo].[DAF_FactureSaisie]
SET  deletedAt=getDate(),
numeroFacture='----'+CAST(id as varchar(20))  +'----'
WHERE id = @id `,
  getfacturebyfournisseurnom: `select * from [dbo].[DAF_FactureSaisie] 
  where deletedAt is null and idfournisseur 
   in(select id from [dbo].[DAF_FOURNISSEURS] where id=@nom)
   and id not in (select idfacture from DAF_factureNavette)
   `,
  gethistoriquefacture: `SELECT f.id
,f.numeroFacture
,f.BonCommande
,f.TTC
,f.DateFacture
,f.HT,
f.createdDate
,f.MontantTVA,
d.designation as "designation" ,
fou.nom as "nom",
fou.CodeFournisseur
FROM [dbo].[DAF_FactureSaisie] f ,  [dbo].[FactureDesignation] d,
[dbo].[DAF_FOURNISSEURS] fou
where d.id=f.iddesignation  and fou.id=f.idfournisseur  and deletedAt is  not null `,

  gethistoriquefacturecount: `SELECT COUNT(*) as count
FROM [dbo].[DAF_FactureSaisie] f ,  [dbo].[FactureDesignation] d,
[dbo].[DAF_FOURNISSEURS] fou
where d.id=f.iddesignation  and fou.id=f.idfournisseur  and deletedAt is  not null `,
  getfacturebyfournisseur: `select f.* from [dbo].[DAF_FactureSaisie] f,
[dbo].[DAF_factureNavette] fn
   where
   fn.idFacture=f.id   and
   f.id not in (select facture from DAF_LOG_FACTURE)
   and
  and idfournisseur in(select id from [dbo].[DAF_FOURNISSEURS] where id=@id)`,
  getfacturevalider: `	SELECT DISTINCT
  ch.LIBELLE,
  f.id,
  f.fullName,
  f.numeroFacture,
  f.BonCommande,
  f.TTC,
  f.DateFacture,
  f.HT,
  f.MontantTVA,
  d.designation AS "designation",
  fou.nom AS "nom",
  fou.CodeFournisseur,
  f.verifiyMidelt,
  f.createdDate
FROM 
  [dbo].[DAF_FactureSaisie] f
  INNER JOIN [dbo].[FactureDesignation] d ON d.id = f.iddesignation
  INNER JOIN [dbo].[DAF_FOURNISSEURS] fou ON fou.id = f.idfournisseur
  LEFT JOIN [dbo].[chantier] ch ON ch.id = f.codechantier
WHERE 
  f.deletedAt IS NULL 
  AND (f.verifiyMidelt IS NULL OR f.BonCommande IS NULL OR f.BonCommande = '')
`,
  getcountvalider: `SELECT COUNT(*) as count FROM [dbo].[DAF_FactureSaisie] WHERE deletedAt IS NULL 
  AND (verifiyMidelt IS NULL OR BonCommande IS NULL OR BonCommande = '')`,

  validerfacture: `UPDATE [dbo].[DAF_FactureSaisie]
  SET  verifiyMidelt=@verifiyMidelt,
  updatedBy=@updatedBy,
  BonCommande=@BonCommande
WHERE id = @id `,
  getsumfacturebyfournisseurwithoutfn: `Select SUM(fa.ttc) as sum from [dbo].[DAF_FOURNISSEURS] f,[dbo].[DAF_Facture_Avance_Fusion] fa
where fa.ficheNavette is null  and fa.DateFacture is not null  and 
f.id=@id and not
EXISTS (SELECT  CODEDOCUTIL,nom
FROM [dbo].[DAF_LOG_FACTURE] lf
where fa.CODEDOCUTIL=lf.CODEDOCUTIL
and lf.etat <>'Annulé'
and fa.nom=lf.NOM
)
 and  fa.nom=f.nom
`,
  getsumfacturebyfournisseurwithfn: `Select SUM(fa.ttc) as sum from [dbo].[DAF_FOURNISSEURS] f,[dbo].[DAF_Facture_Avance_Fusion] fa
where fa.ficheNavette is not null and fa.DateFacture is not null and 
f.id=@id and not
EXISTS (SELECT  CODEDOCUTIL,nom
FROM [dbo].[DAF_LOG_FACTURE] lf
where fa.CODEDOCUTIL=lf.CODEDOCUTIL
and lf.etat <>'Annulé'
and fa.nom=lf.NOM
)
 and  fa.nom=f.nom

`,
};
exports.factureFicheNavette = {
  updateQuery: `
        UPDATE DAF_FactureSaisie
        SET NetAPayer = @netAPayer
        WHERE id = @idFacture
      `,
  getTtcQuery: `
        SELECT TTC
        FROM DAF_FactureSaisie
        WHERE id = @idFacture
      `,

  updateFactureQuery: `
  UPDATE DAF_factureNavette
  SET ficheNavette = @ficheNavette,
      idFacture = @idFacture,
      codechantier = @codechantier,
      idfournisseur = @idfournisseur,
      montantAvance = @montantAvance
  WHERE idfacturenavette = @id
`,
  getMontantAvanceQuery: `
        SELECT montantAvance
        FROM DAF_factureNavette
        WHERE idFacture = @idFacture
      `,
  createBonlivraison: `INSERT INTO [dbo].[BonlivraisonTable]
  ([Bonlivraison])
VALUES
  (@BonLivraison)`,
  create: `INSERT INTO [dbo].[DAF_factureNavette]
  ([codechantier], [montantAvance], [idfournisseur], [idFacture], [ficheNavette], [Bcommande], [fullname])
  VALUES 
  (@codechantier, @montantAvance, @idfournisseur, @idFacture, @modifiedFicheNavette, @Bcommande, @fullName)`,

  get: `
  SELECT DISTINCT
  fich.id,
  fich.BonCommande,
  fich.CodeFournisseur,
  fich.montantAvance,
  fich.nom,
  fich.MontantTVA,
  fich.DateFacture,
  fich.TTC,
  fich.HT,
  fich.designation,
  fich.numeroFacture,
  fich.ficheNavette,
  fich.fullname,
  fich.deletedAt,
  fich.annulation,
  CASE
      WHEN fich.numeroFacture IS NULL THEN 'avance'
      WHEN fich.deletedAt IS NOT NULL THEN 'facture annulée'
      ELSE 'normal'
  END AS etat,
  CASE
      WHEN ch.LIBELLE IS NULL THEN fich.LIBELLE
      ELSE ch.LIBELLE
  END AS libelle
FROM [dbo].[DAF_ficheNavette] fich
LEFT JOIN (SELECT * FROM chantier) ch ON fich.LIBELLE = ch.LIBELLE
WHERE fich.deletedAt IS NULL
AND fich.ficheNavette <> 'Annuler'
`,
  getCount: `SELECT COUNT(*) as count
    FROM  [dbo].[DAF_ficheNavette]
    WHERE  ficheNavette<>'Annuler' `,
  getOne: `select * from DAF_ficheNavette where id=@id`,
  update: `update [dbo].[DAF_factureNavette] 
        set ficheNavette=@ficheNavette,
              idfacture=@idFacture,
              codechantier=@codechantier,
              montantAvance=@montantAvance,
              Bcommande=@BonCommande
        where idfacturenavette=@id `,
  getavancebyfournisseur: `select * from DAF_factureNavette
where Bcommande is not null
and idFacture=0 and idfournisseur=@idfournisseur`,

  getsumavancebyforurnisseur: `Select SUM(fa.ttc) as sum from [dbo].[DAF_FOURNISSEURS] f,[dbo].[DAF_Facture_Avance_Fusion] fa
where fa.ficheNavette is not null and fa.DateFacture is  null and 
f.id=@id and not
EXISTS (SELECT  CODEDOCUTIL,nom
FROM [dbo].[DAF_LOG_FACTURE] lf
where fa.CODEDOCUTIL=lf.CODEDOCUTIL
and lf.etat <>'Annulé'
and fa.nom=lf.NOM
)
 and  fa.nom=f.nom

`,
  annulationFn: `update DAF_factureNavette  set  idfacture=0 ,  ficheNavette='Annuler' where idfacturenavette=@id`,
  updateficheNavette: `  UPDATE DAF_factureNavette
  SET ficheNavette = @ficheNavette,
      idFacture = @idFacture,
      codechantier = @codechantier,
      idfournisseur = @idfournisseur,
      montantAvance = @montantAvance
  WHERE idfacturenavette = @id`,
  getMontantAvance: `SELECT montantAvance FROM DAF_factureNavette WHERE idFacture = @idFacture`,
  updateNetApayer: ` UPDATE DAF_FactureSaisie
SET NetAPayer = @netAPayer
WHERE id = @idFacture`,
  existingCompositionAvance: ` SELECT COUNT(*)
FROM daf_factureNavette AS dfn1
WHERE 
   dfn1.ficheNavette = @ficheNavette
  AND dfn1.Bcommande = @Bcommande
  AND dfn1.idfournisseur = @idfournisseur
  And idfacture=0
group by  dfn1.ficheNavette,
     dfn1.ficheNavette,
     dfn1.Bcommande
     `,
};

exports.designation = {
  getdesignationCount: "SELECT COUNT(*) FROM [dbo].[CMT_FactureDesignation]",
  getDesignation: "SELECT * FROM [dbo].[CMT_FactureDesignation] where 1=1 ",
  getdesignationbyid: `SELECT *
     FROM [dbo].[CMT_FactureDesignation]
     where id=@id `,
};
exports.SuivieFacture = {
  getSuivieFacture: `select distinct 
  [id]
      ,[BonCommande]
      ,[chantier]
      ,[DateFacture]
      ,[TTC]
      ,[HT]
      ,[numeroFacture]
      ,[MontantTVA]
      ,[CodeFournisseur]
      ,[nom]
      ,[datecheque]
      ,[dateecheance]
      ,[ficheNavette]
      ,[dateOperation]
      ,[modepaiement]
      ,[banque]
      ,[designation]
      ,[numerocheque]
      ,[montantAvance]
      ,[etat],
      ModePaiementID
	  , CASE WHEN etat = 'pas encore' THEN  DATEDIFF(DAY, DateFacture, GETDATE()) 	  
	  ELSE NULL  
	  END AS nbrJour
    
    from  DAF_SuivieFacture  where numeroFacture  not  like '%-'
`,

  getSuivieFacturecount: `
    select count(*) as count
    from DAF_SuivieFacture  
      where numeroFacture  not  like '%-'
    
    `,

  getSuivieFactureEchu: `select * from DAF_SuivieFactureEchu
  where 1=1
  `,
  getSuivieFactureEchucount: `
select count(*) as count
from DAF_SuivieFactureEchu 
where 1=1
`,
};

exports.cheque = {
  create: `
  INSERT INTO [dbo].[DAF_cheque]
      (
       [fournisseurId]
       ,[numerocheque]
       ,[datecheque]
       ,[dateecheance]
      ,[RibAtnerId]
      ,[montantVirement])
  VALUES
      (
       @fournisseurId
       ,@numerocheque
       ,@datecheque
       ,@dateecheance
      ,@orderVirementId
      ,@montantVirement
      )`,
  getCount: "SELECT COUNT(*) as count FROM [dbo].[DAF_cheque]",
  getAll: `
  SELECT v.[id]
      ,[ribatnerid],
      dateOperation
      ,[montantVirement],
      [Etat],
	  rf.nom ,v.numerocheque,v.datecheque,v.dateecheance
    ,f.nom as "fournisseur"
   ,CodeFournisseur
  FROM  [dbo].[DAF_cheque] v ,
      [dbo].[DAF_RIB_ATNER] rf,
      [dbo].[DAF_FOURNISSEURS] f
  where v.fournisseurId = f.id
    and v.ribatnerid = rf.id
    and 1=1
  `,
  getDataFromLogFacture: `SELECT * FROM [dbo].[DAF_Facture_Avance_Fusion] where 1=1 `,
  createLogFacture: `
 INSERT INTO [dbo].[DAF_LOG_FACTURE]
           ([CODEDOCUTIL]
           ,[CODECHT]
            ,[NOM]
           ,[LIBREGLEMENT]
           ,[DATEDOC]
           ,[TOTALTTC]
           ,[TOTHTNET]
           ,[TOTTVANET]
           ,[NETAPAYER]
           ,[ModePaiementID],
            [modepaiement],
            [idAvance],
            [numerocheque]
           )
     VALUES`,
  update: `Update [dbo].[DAF_cheque]
            set 
            dateOperation=@dateOperation,
            Etat=@Etat
            where id=@id`,
  getOne: `
  SELECT v.[id]
  ,[ribatnerid],
            v.[Etat]
  ,[montantVirement],
rf.nom ,v.numerocheque,v.datecheque,v.dateecheance
,f.nom as "fournisseur"
,CodeFournisseur
FROM  [dbo].[DAF_cheque] v ,
  [dbo].[DAF_RIB_ATNER] rf,
  [dbo].[DAF_FOURNISSEURS] f
where v.fournisseurId = f.id
and v.ribatnerid = rf.id
    and v.[id] = @id
 `,

  updateLogFactureWhenAnnuleV:
    "update [dbo].[DAF_LOG_FACTURE] set Etat = 'Annulé' where [numerocheque] =@numerocheque",

  updateLogFactureWhenRegleeV: `update [dbo].[DAF_LOG_FACTURE] set Etat = 'Reglee' where [numerocheque] =@numerocheque
                and etat<>'Annulé'
    `,
};

exports.espece = {
  create: `
  INSERT INTO [dbo].[DAF_espece]
      (
       [fournisseurId]
      ,[montantVirement])
  VALUES
      (
       @fournisseurId 
      ,@montantVirement
      )`,
  getCount: "SELECT COUNT(*) as count FROM [dbo].[DAF_espece]",
  getAll: `
  SELECT v.[id],
      v.[Datepaiement]
      ,[montantVirement]
    ,f.nom as "fournisseur"
   ,CodeFournisseur
  FROM  [dbo].[DAF_espece] v ,
      [dbo].[DAF_FOURNISSEURS] f
  where v.fournisseurId = f.id
    and 1=1
  `,
  getDataFromLogFacture: `SELECT * FROM [dbo].[DAF_Facture_Avance_Fusion] where 1=1 `,
  createLogFacture: `
 INSERT INTO [dbo].[DAF_LOG_FACTURE]
           ([CODEDOCUTIL]
           ,[CODECHT]
            ,[NOM]
           ,[LIBREGLEMENT]
           ,[DATEDOC]
           ,[TOTALTTC]
           ,[TOTHTNET]
           ,[TOTTVANET]
           ,[NETAPAYER]
           ,[ModePaiementID],
           [etat],
           [modepaiement],
           [idAvance]
           )
     VALUES`,

  getOne: `
  SELECT v.[id]
      ,[orderVirementId]
      ,f.nom
      ,rf.rib
      ,[montantVirement],
      v.Etat
  FROM  [dbo].[DAF_VIREMENTS] v ,
      [dbo].[DAF_RIB_Fournisseurs] rf,
      [dbo].[DAF_FOURNISSEURS] f
  where v.fournisseurId = f.id
    and v.ribFournisseurId = rf.id
    and v.[id] = @id
 `,
};

exports.avancevirement = {
  create: `
INSERT INTO [dbo].[DAF_virementAvance]
  (
   [fournisseurId]
  ,[ribFournisseurId]
  ,[orderVirementId]
  ,[montantVirement])
VALUES
  (
   @fournisseurId
  ,@ribFournisseurId
  ,@orderVirementId
  ,@montantVirement
  )`,
  getCount: "SELECT COUNT(*) as count FROM [dbo].[DAF_virementAvance]",
  getAll: `
  SELECT v.[id]
  ,[orderVirementId]
  ,f.nom
  ,rf.rib
  ,[montantVirement],
  v.Etat,
  v.dateoperation
  FROM  [dbo].[DAF_virementAvance] v ,
  [dbo].[DAF_RIB_Fournisseurs] rf,
  [dbo].[DAF_FOURNISSEURS] f
  where v.fournisseurId=f.CodeFournisseur
  and v.ribFournisseurId = rf.id
`,
  getDataFromLogFacture: `SELECT * FROM [dbo].[ficheNavette] where 1=1 `,
  createLogFacture: `
INSERT INTO [dbo].[DAF_LOG_FACTURE]
       ([CODEDOCUTIL]
       ,[CODECHT]
        ,[NOM]
       ,[LIBREGLEMENT]
       ,[DATEDOC]
       ,[TOTALTTC]
       ,[TOTHTNET]
       ,[TOTTVANET]
       ,[NETAPAYER]
       ,[orderVirementId],
       [idAvance],
        [modepaiement]
       )
 VALUES`,
  update: `Update [dbo].[DAF_virementAvance]
        set Etat=@Etat,
        dateOperation=@dateOperation
        where id=@id`,
  getOne: `
SELECT v.[id]
  ,[orderVirementId]
  ,f.nom
  ,rf.rib
  ,[montantVirement],
  v.Etat
FROM  [dbo].[DAF_virementAvance] v ,
  [dbo].[DAF_RIB_Fournisseurs] rf,
  [dbo].[DAF_FOURNISSEURS] f
where v.fournisseurId = f.id
and v.ribFournisseurId = rf.id
and v.[id] = @id
`,

  updateLogFactureWhenAnnuleV:
    "update [dbo].[DAF_virementAvance] set Etat = 'Annulé' where [orderVirementId] =@orderVirementId and nom=@nom",
};

exports.BonLivraison = {
  getAllBl: `
  SELECT * 
  FROM BonlivraisonTable
where 1=1

  `,
  getAllBlCount: `
  SELECT   count(*)
  FROM BonlivraisonTable
  where 1=1
  
    `,
};
exports.EcheanceReel = {
  getAllecheanceReel: `
  SELECT  erf.id as id ,nom,fou.id as idfournisseur,
      [modalitePaiement]
      ,[dateecheance]
  FROM [DAF_echeanceReelFournisseur] erf
  inner join DAF_FOURNISSEURS fou
  on  erf.idfournisseur=fou.id
  where 1=1
  `,
  getAllecheanceReelCount: `
  SELECT   COUNT(*) as count
  FROM [dbo].[DAF_echeanceReelFournisseur]
    `,
  create: `INSERT INTO [dbo].[DAF_echeanceReelFournisseur]
  ([idfournisseur]
  ,[modalitePaiement]
  ,[dateecheance]) values (@idfournisseur,@modalitePaiement,@dateecheance)`,
  getEcheanceReelbyfournisseur: `select modalitePaiement from DAF_echeanceReelFournisseur
  where idfournisseur=@idfournisseur
  and id =(select max(id) from DAF_echeanceReelFournisseur
        where idfournisseur=@idfournisseur
        group by idfournisseur)
`,
};

exports.EcheanceLoi = {
  getAllecheanceLoi: `
  SELECT  erf.id as id ,nom,fou.id as idfournisseur,
      [modalitePaiement]
      ,[dateecheance]
  FROM [DAF_echeanceloiFournisseur] erf
  inner join DAF_FOURNISSEURS fou
  on  erf.idfournisseur=fou.id
  where 1=1
  `,
  getAllecheanceLoiCount: `
  SELECT   COUNT(*) as count
  FROM [dbo].[DAF_echeanceloiFournisseur]
    `,
  create: `INSERT INTO [dbo].[DAF_echeanceloiFournisseur]
  ([idfournisseur]
  ,[modalitePaiement]
  ,[dateecheance]) values (@idfournisseur,@modalitePaiement,@dateecheance)`,
  getEcheanceLoibyfournisseur: `select modalitePaiement from DAF_echeanceloiFournisseur
  where idfournisseur=@idfournisseur
  and id =(select max(id) from DAF_echeanceloiFournisseur
        where idfournisseur=@idfournisseur
        group by idfournisseur)
`,
};

exports.Avance = {
  getAvancesCount: `Select count(*) from [dbo].[CMT_Avance]`,
  getOneAvance: `select * from [dbo].[CMT_Avance] where id=@id`,
  getAllAvances: `select a.id, BonCommande,MontantAvance, MontantTotal, DocumentReference, DateDocumentReference,
  f.Nom, f.CodeFournisseur, Redacteur, DateAvance, NombreDeParties, CreatedDate,
  Chantier, CumulRegle, CumulValide, Annulation, Restituer, Etat, c.LIBELLE
  from [dbo].[CMT_Avance] a, [dbo].[CMT_Chantier] c , [dbo].[CMT_Fournisseurs] f
  where a.Chantier = c.id
  and a.IdFournisseur = f.id `,

  createAvance: `INSERT INTO [dbo].[CMT_Avance]
           ([id]
           ,[BonCommande]
           ,[MontantAvance]
           ,[MontantTotal]
           ,[DocumentReference]
           ,[DateDocumentReference]
           ,[IdFournisseur]
           ,[Redacteur]
           ,[DateAvance]
           ,[NombreDeParties]
           ,[Chantier]
           ,[Restituer])
     VALUES
           (@id
           ,@BonCommande
           ,@MontantAvance
           ,@MontantTotal
           ,@DocumentReference
           ,@DateDocumentReference
           ,@IdFournisseur
           ,@Redacteur
           ,@DateAvance
           ,@NombreDeParties
           ,@Chantier
           ,@Restituer)
`,
  updateAvance: `UPDATE [dbo].[CMT_Avance] set BonCommande = @BonCommande
      ,MontantAvance = @MontantAvance
      ,MontantTotal = @MontantTotal
      ,DocumentReference = @DocumentReference
      ,DateDocumentReference = @DateDocumentReference
      ,IdFournisseur = @IdFournisseur
      ,Redacteur = @Redacteur
      ,DateAvance = @DateAvance
      ,NombreDeParties = @NombreDeParties
      ,Chantier = @Chantier
      ,Restituer = @Restituer
 WHERE id = @id`,

  getavancebyfournisseur: `select a.id, BonCommande,MontantAvance, MontantTotal, DocumentReference, DateDocumentReference,
  f.Nom, f.CodeFournisseur, Redacteur, DateAvance, NombreDeParties, CreatedDate,
  Chantier, CumulRegle, CumulValide, Annulation, Restituer, Etat, c.LIBELLE
  from [dbo].[CMT_Avance] a, [dbo].[CMT_Chantier] c , [dbo].[CMT_Fournisseurs] f
  where a.Chantier = c.id
  and a.IdFournisseur = f.id
  and f.CodeFournisseur = @idfournisseur`,

  getavancebyboncommande: `select a.id, BonCommande,MontantAvance, MontantTotal, DocumentReference, DateDocumentReference,
  f.Nom, f.CodeFournisseur, Redacteur, DateAvance, NombreDeParties, CreatedDate,
  Chantier, CumulRegle, CumulValide, Annulation, Restituer, Etat, c.LIBELLE
  from [dbo].[CMT_Avance] a, [dbo].[CMT_Chantier] c , [dbo].[CMT_Fournisseurs] f
  where a.Chantier = c.id
  and a.IdFournisseur = f.id
  and BonCommande = @bonCommande`,
};
