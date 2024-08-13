from app.models import db, Note, Notebook, environment, SCHEMA, notebook_notes
from datetime import datetime
from sqlalchemy.sql import text

def seed_notes():
    note1 = Note(
        title='Hortensio', content="There's small choice in rotten apples.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note2 = Note(
        title='Katherina', content='If I be waspish, best beware my sting. ', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note3 = Note(
        title='Petruchio', content="Why, there's a wench! Come on, and kiss me, Kate.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note4 = Note(
        title='Bianca', content="Old fashions please me best. I am not so nice To change true rules for old inventions.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note5 = Note(
        title='Tranio', content="No profit grows where is no pleasure ta’en: In brie, sir, study what you most affect.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note6 = Note(
        title='Dick the butcher', content="The first thing we do, let's kill all the lawyers.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note7 = Note(
        title='Suffolk', content="Smooth runs the water where the brook is deep: And in his simple show he harbours treason.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note8 = Note(
        title='Cade', content='Thou hast most traitorously corrupted the youth of the realm in erecting a grammar school.', user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note9 = Note(
        title='Suffolk', content='Small things make base men proud.', user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note10 = Note(
        title='King Henry VI', content='Can we outrun the heavens?', user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note11 = Note(
        title='Richard', content="How sweet a thing it is to wear a crown, Within whose circuit is Elysium And all that poets feign of bliss and joy.", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note12 = Note(
        title='Clifford', content='The smallest worm will turn being trodden on.', user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note13 = Note(
        title='King Henry VI', content="O God! Methinks it were a happy life, To be no better than a homely swain, To sit upon a hill, as I do now, To carve out dials quaintly, point by point, Thereby to see the minutes how they run:", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note14 = Note(
        title='Lady Grey', content='For trust not him that hath once broken faith.', user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note15 = Note(
        title='Gloucester', content='Suspicion always haunts the quilty mind.', user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note16 = Note(
        title='Julia', content='You, minion, are too saucy', user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note17 = Note(
        title='Duke', content='Love is like a child That longs for every thing that he can come by.', user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note18 = Note(
        title='Valentine', content='And why not death, rather than living torment? To die is to be banished from myself; And Silvia is myself: banished from her, Is self from self. A deadly banishment: What light is light, if Silvia be not seen? What joy is joy, if Silvia be not by?', user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note19 = Note(
        title='Julia', content="She dreams on him that has forgot her love, You dote on her that cares not for your love. 'Tis pity love should be so contrary: And thinking on it makes me cry 'Alas'.", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note20 = Note(
        title='Proteus', content='O heaven, were man But constant, he were perfect.', user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note21 = Note(
        title='Tamora', content="O cruel, irreligious piety!", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note22 = Note(
        title='Aaron', content="Madam, though Venus govern your desires, Saturn is dominator over mine.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note23 = Note(
        title='Marcus', content="Alas, poor man! Grief has so wrought on him, He takes false shadows for true substances.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note24 = Note(
        title='Titus', content="Die, die, Lavinia, and thy shame with thee, And with thy shame thy father’s sorrow die!", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note25 = Note(
        title='Marcus', content="O, let me teach you how to knit again This scattered corn into one mutual sheaf, These broken limbs again into one body.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note26 = Note(
        title='Talbot', content="My thoughts are whirled like a potter's wheel: I know not where I am, nor what I do.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note27 = Note(
        title='Bedford', content="I have heard it said, unbidden guests Are often welcomest when they are gone.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note28 = Note(
        title='Reignier', content="Defer no time, delays have dangerous ends.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note29 = Note(
        title='Exeter', content="No simple man that sees This jarring discord of nobility, This shouldering of each other in the court, This factious bandying of their favourites, But that it doth presage some ill event.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note30 = Note(
        title='John', content="Here on my knee I beg mortality, Rather than life preserved with infamy.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note31 = Note(
        title='Richard', content="Now is the winter of our discontent Made glorious summer by this sun of York.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note32 = Note(
        title='Richard', content="And thus I clothe my naked villany With old odd ends stolen out of holy writ; And seem a saint, when most I play the devil. ", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note33 = Note(
        title='Richard', content="So wise so young, they say, do never live long.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note34 = Note(
        title='Richard', content="Talk'st thou to me of 'ifs'? Thou art a traitor: Off with his head! ", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note35 = Note(
        title='Richard', content="A horse! a horse! my kingdom for a horse!", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note36 = Note(
        title='Antipholus of Syracuse', content="I to the world am like a drop of water That in the ocean seeks another dropWho, falling there to find his fellow forth - Unseen, inquisitive - confounds himself.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note37 = Note(
        title='Dromio of Syracuse', content="Every why hath a wherefore", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note38 = Note(
        title='Balthazar', content="Small cheer and great welcome makes a merry feast", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note39 = Note(
        title='Adriana', content="He is deformed, crooked, old and sere, Ill-faced, worse bodied, shapeless everywhere, Vicious, ungentle, foolish, blunt, unkind, Stigmatical in making, worse in mind.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note40 = Note(
        title='Dromio of Ephesus', content="And now let’s go hand in hand, not one before another.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note41 = Note(
        title='King', content="Our court shall be a little academe, Still and contemplative in living art.  ", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note42 = Note(
        title='Princess of France', content="Beauty is bought by judgement of the eye, Not uttered by base sale of chapmen's tongues", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note43 = Note(
        title='Berowne', content="Your wit's too hot, it speeds too fast, ‘twill tire. ", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note44 = Note(
        title='Berowne', content="From women's eyes this doctrine I derive: They are the ground, the books, the academes From whence doth spring the true Promethean fire.  ", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note45 = Note(
        title='Moth', content="They have been at a great feast of languages, and stolen the scraps. ", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note46 = Note(
        title='Helena', content="Love looks not with the eyes, but with the mind, And therefore is winged Cupid painted blind.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note47 = Note(
        title='Bottom', content="To say the truth, reason and love keep little company together nowadays.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note48 = Note(
        title='Titania', content="Methought I was enamoured of an ass.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note49 = Note(
        title='Puck', content="...not a mouse Shall disturb this hallowed house. I am sent with broom before, To sweep the dust behind the door.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note50 = Note(
        title='Puck', content="If we shadows have offended, Think but this, and all is mended, That you have but slumbered here While these visions did appear.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note51 = Note(
        title='Chorus', content="A pair of star-crossed lovers take their life.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note52 = Note(
        title='Romeo', content="But, soft, what light through yonder window breaks? It is the east, and Juliet is the sun.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note53 = Note(
        title='Mercutio', content="A plague o' both your houses!", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note54 = Note(
        title='Juliet', content="O happy dagger, This is thy sheath: there rust, and let me die.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note55 = Note(
        title='Prince', content="All are punshied", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note56 = Note(
        title='King Richard', content="Forget, forgive, conclude and be agreed: Our doctors say this is no time to bleed.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note57 = Note(
        title='Gaunt', content="This blessed plot, this earth, this realm, this England.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note58 = Note(
        title='King Richard', content="For heaven’s sake let us sit upon the ground And tell sad stories of the death of kings.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note59 = Note(
        title='Bullingbrook', content="The shadow of your sorrow hath destroyed The shadow of your face.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note60 = Note(
        title='King Richard', content="I wasted time, and now doth time waste me.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note61 = Note(
        title='Constance', content="I will instruct my sorrows to be proud, For grief is proud and makes his owner stoop.", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note62 = Note(
        title='Lewis', content="Life is as tedious as a twice-told tale, Vexing the dull ear of a drowsy man;", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note63 = Note(
        title='Salisbury', content="To gild refinèd gold, to paint the lily, To throw a perfume on the violet, To smooth the ice, or add another hue Unto the rainbow, or with taper-light To seek the beauteous eye of heaven to garnish, Is wasteful and ridiculous excess. ", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note64 = Note(
        title='King John', content="How oft the sight of means to do ill deeds Makes deeds ill done! ", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note65 = Note(
        title='Bastard', content="Be great in act as you have been in thought", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note66 = Note(
        title='Antonio', content="I hold the world but as the world, Gratiano, A stage where every man must play a part, And mine a sad one.", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note67 = Note(
        title='Jessica', content="But love is blind, and lovers cannot see The pretty follies that themselves commit.", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note68 = Note(
        title='Morocco', content="All that glisters is not gold.", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note69 = Note(
        title='Shylock', content="If you prick us, do we not bleed? If you tickle us, do we not laugh? If you poison us, do we not die? And if you wrong us, shall we not revenge? ", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note70 = Note(
        title='Lorenzo', content="The man that hath no music in himself, Nor is not moved with concord of sweet sounds, Is fit for treasons, stratagems and spoils. The motions of his spirit are dull as night And his affections dark as Erebus. Let no such man be trusted.", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note71 = Note(
        title='Falstaff', content="Let us be Diana’s foresters, gentlemen of the shade, minions of the moon.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note72 = Note(
        title='Hotspur', content="While you live, tell truth and shame the devil!", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note73 = Note(
        title='King Henry IV', content="He was but as the cuckoo is in June, Heard, not regarded.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note74 = Note(
        title='Falstaff', content="Can Honour set to a leg? No. Or an arm? No. Or take away the grief of a wound? No. Honour hath no skill in surgery then? No. What is Honour? A word. What is that word ‘honour’? Air. ", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note75 = Note(
        title='Hotspur', content="O, Harry, thou hast robbed me of my youth!", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note76 = Note(
        title='Lord Chief Justice', content="Since all is well, keep it so: wake not a sleeping wolf.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note77 = Note(
        title='Hostess Quickly', content="He hath eaten me out of house and home.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note78 = Note(
        title='King Henry IV', content="Uneasy lies the head that wears a crown.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note79 = Note(
        title='Warwick', content="His cares are now all ended.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note80 = Note(
        title='King Henry V', content="Presume not that I am the thing I was.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note81 = Note(
        title='Don Padro', content="In time the savage bull doth bear the yoke.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note82 = Note(
        title='Benedick', content="When I said I would die a bachelor, I did not think I should live till I were married.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note83 = Note(
        title='Beatrice', content="I love you with so much of my heart that none is left to protest.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note84 = Note(
        title='Leonato', content="For there was never yet philosopher That could endure the toothache patiently.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note85 = Note(
        title='Benedick', content="Thou and I are too wise to woo peaceably.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note86 = Note(
        title='King Henry', content="Once more unto the breach, dear friends, once more, Or close the wall up with our English dead.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note87 = Note(
        title='King Henry', content="The game's afoot: Follow your spirit, and upon this charge Cry ‘God for Harry, England, and Saint George!’", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note88 = Note(
        title='King Henry', content="This story shall the good man teach his son, And Crispin Crispian shall ne'er go by, From this day to the ending of the world, But we in it shall be remembered; We few, we happy few, we band of brothers. For he to-day that sheds his blood with me Shall be my brother.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note89 = Note(
        title='Fluellen', content="There is occasions and causes why and wherefore in all things.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note90 = Note(
        title='King Henry', content="A good heart, Kate, is the sun and the moon— or rather the sun and not the moon, for it shines bright and never changes, but keeps his course truly. If thou would have such a one, take me: and take me, take a soldier: take a soldier, take a king.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note91 = Note(
        title='Jaques', content="All the world's a stage, And all the men and women merely players;", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note92 = Note(
        title='Rosalind', content="Beauty provoketh thieves sooner than gold.", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note93 = Note(
        title='Rosalind', content="Thou speakest wiser than thou art ware of.", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note94 = Note(
        title='Rosalind', content="I pray you do not fall in love with me, For I am falser than vows made in wine.", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note95 = Note(
        title='Orlando', content="Forever and a day.", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note96 = Note(
        title='Soothsayer', content="Beware the Ides of March.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note97 = Note(
        title='Cassius', content="Men at some time are masters of their fates. The fault, dear Brutus, is not in our stars But in ourselves, that we are underlings.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note98 = Note(
        title='Brutus', content="Not that I loved Caesar less, but that I loved Rome more.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note99 = Note(
        title='Caesar', content="Cowards die many times before their deaths, The valiant never taste of death but once. ", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note100 = Note(
        title='Antony', content="Cry havoc and let slip the dogs of war.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note101 = Note(
        title='Marcellus', content="Something is rotten in the state of Denmark.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note102 = Note(
        title='Polonius', content="Neither a borrower nor a lender be, For loan oft loses both itself and friend, And borrowing dulls the edge of husbandry.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note103 = Note(
        title='Hamlet', content="There is nothing either good or bad but thinking makes it so.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note104 = Note(
        title='Hamlet', content="To be, or Note2be, that is the question.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note105 = Note(
        title='Hamlet', content="Alas, poor Yorick! I knew him, Horatio: A fellow of infinite jest.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note106 = Note(
        title='Mistress Quickly', content="Here will be an old abusing of God's patience and the King's English.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note107 = Note(
        title='Pistol', content="Why, then the world's mine oyster, which I with sword will open.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note108 = Note(
        title='Ford', content="Better three hours too soon than a minute too late.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note109 = Note(
        title='Mistress Page', content="Wives may be merry, and yet honest too.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note110 = Note(
        title='Falstaff', content="I think the devil will not have me damned, lest the oil that's in me should set hell on fire.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note111 = Note(
        title='Feste', content="Better a witty fool than a foolish wit.", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note112 = Note(
        title='Malvolio', content="Some are born great, some achieve greatness and some have greatness thrust upon 'em.", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note113 = Note(
        title='Feste', content="Foolery, sir, does walk about the orb like the sun, it shines everywhere.", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note114 = Note(
        title='Feste', content="And thus the whirligig of time brings in his revenges.", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note115 = Note(
        title='Orsino', content="Cesario, come – For so you shall be, while you are a man. But when in other habits you are seen, Orsino's mistress, and his fancy's queen.", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note116 = Note(
        title='Cressida', content="Things won are done, joy's soul lies in the doing. That she beloved knows nought that knows nought this: Men prize the thing ungained more than it is.", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note117 = Note(
        title='Thersites', content="The common curse of mankind, folly and ignorance, be thine in great revenue!", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note118 = Note(
        title='Ulysses', content="One touch of nature makes the whole world kin.", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note119 = Note(
        title='Ulysses', content="There's language in her eye, her cheek, her lip; Nay, her foot speaks, her wanton spirits look out At every joint and motive of her body.", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note120 = Note(
        title='Hector', content="The end crowns all, And that old common arbitrator, Time, Will one day end it.", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note121 = Note(
        title='Iago', content="But I will wear my heart upon my sleeve For daws to peck at: I am not what I am.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note122 = Note(
        title='Cassio', content="Reputation, reputation, reputation! O, I have lost my reputation! I have lost the immortal part of myself, and what remains is bestial.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note123 = Note(
        title='Iago', content="O, beware, my lord, of jealousy: It is the green-eyed monster which doth mock The meat it feeds on.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note124 = Note(
        title='Emilia', content="Let heaven and men and devils, let them all, All, all, cry shame against me, yet I'll speak.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note125 = Note(
        title='Othello', content="I kissed thee ere I killed thee: no way but this, Killing myself, to die upon a kiss.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note126 = Note(
        title='Lucio', content="Our doubts are traitors, And make us lose the good we oft might win By fearing to attempt.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note127 = Note(
        title='Angelo', content="Is this her fault or mine? The tempter or the tempted, who sins most?", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note128 = Note(
        title='Claudio', content="The miserable have no other medicineBut only hope.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note129 = Note(
        title='Duke', content="Haste still pays haste, and leisure answers leisure, Like doth quit like, and measure still for measure.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note130 = Note(
        title='Duke', content="What's mine is yours and what is yours is mine", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note131 = Note(
        title='Countess', content="Love all, trust a few, do wrong to none.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note132 = Note(
        title='Helen', content="Great floods have flown From simple sources, and great seas have dried When miracles have by the great’st been denied.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note133 = Note(
        title='Mariana', content="No legacy is so rich as honesty.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note134 = Note(
        title='Helen', content="All's well that ends well, still the fine's the crown; Whate'er the course, the end is the renown.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note135 = Note(
        title='King', content="For we are old, and on our quick'st decrees Th’inaudible and noiseless foot of time Steals ere we can effect them.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note136 = Note(
        title='Apemantus', content="Here's that which is too weak to be a sinner— Honest water—which ne'er left man i'th’mire.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note137 = Note(
        title='Lucullus', content="Every man has his fault, and honesty is his.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note138 = Note(
        title='Flavius', content="Strange, unusual blood, When man’s worst sin is he does too much good!", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note139 = Note(
        title='Timon', content="You are an alchemist, make gold of that.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note140 = Note(
        title='Alcibiades', content="'Here lies a wretched corpse, of wretched soul bereft. Seek not my name. A plague consume you wicked caitiffs left! Here lie I, Timon, who alive all living men did hate: Pass by and curse they fill, but pass and stay not here thy gait.'", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note141 = Note(
        title='Edmund', content="Now, gods, stand up for bastards!", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note142 = Note(
        title='Gloucester', content="As flies to wanton boys are we to th' gods: They kill us for their sport.", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note143 = Note(
        title='Lear', content="I am a man More sinned against than sinning.", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note144 = Note(
        title='Lear', content="When we are born, we cry that we are come To this great stage of fools.", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note145 = Note(
        title='Lear', content="When thou dost ask me blessing, I'll kneel down And ask of thee forgiveness. ", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note146 = Note(
        title='Macbeth', content="If it were done when 'tis done, then 'twere well It were done quickly.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note147 = Note(
        title='Macbeth', content="Is this a dagger which I see before me, The handle toward my hand? Come, let me clutch thee: I have thee not, and yet I see thee still.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note148 = Note(
        title='Macbeth', content="It will have blood, they say: blood will have blood.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note149 = Note(
        title='Witches', content="Double, double toil and trouble: Fire burn, and cauldron bubble.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note150 = Note(
        title='Lady Macbeth', content="What's done cannot be undone.", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note151 = Note(
        title='Cleopatra', content="O happy horse, to bear the weight of Antony!", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note152 = Note(
        title='Cleopatra', content="My salad days, When I was green in judgement, cold in blood.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note153 = Note(
        title='Enobarbus', content="Age cannot wither her, nor custom stale Her infinite variety.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note154 = Note(
        title='Cahrmian', content="Now boast thee, death, in thy possession lies A lass unparalleled.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note155 = Note(
        title='Caesar', content="She shall be buried by her Antony, No grave upon the earth shall clip in it A pair so famous.", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note156 = Note(
        title='Matius', content="If any think brave death outweighs bad life, And that his country's dearer than himself, Let him alone, or so many so minded, Wave thus to express his disposition,", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note157 = Note(
        title='Sicinius', content="Nature teaches beasts to know their friends", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note158 = Note(
        title='Sicinius', content="What is the city but the people?", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note159 = Note(
        title='Volumnia', content="Action is eloquence.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note160 = Note(
        title='Coriolanus', content="There is a world elsewhere.", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note161 = Note(
        title='Pericles', content="Which care of them, not pity of myself, Who am no more but as the tops of trees. Which fence the roots they grow by and defend them, Makes both my body pine and soul to languish.", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note162 = Note(
        title='First Fisherman', content="Why, as men do a-land; the great ones eat up the little ones.", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note163 = Note(
        title='Cerimon', content="The diamonds of a most praised water Doth appear, to make the world twice rich.", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note164 = Note(
        title='Bawd', content="That she would make a puritan of the devil if he should cheapen a kiss of her", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note165 = Note(
        title='Pericles', content="O, come, be buried A second time within these arms.", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note166 = Note(
        title='Iachimo', content="Boldness be my friend: Arm me audacity from head to foot!", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note167 = Note(
        title='Arviragus', content="Our cage We make a choir, as doth the prisoned bird, And sing our bondage freely.", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note168 = Note(
        title='Belarius', content="The game is up.", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note169 = Note(
        title='Pisanio', content="I have not slept one wink.", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note170 = Note(
        title='Guiderius', content="Play judge and executioner all himself.", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note171 = Note(
        title='Leontes', content="Is this nothing? Why then the world and all that's in't is nothing: The covering sky is nothing, Bohemia nothing, My wife is nothing, nor nothing have these nothings, If this be nothing.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note172 = Note(
        title='Paulina', content="The silence often of pure innocence Persuades when speaking fails.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note173 = Note(
        title='Stage direction', content="Exit, pursued by a bear.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note174 = Note(
        title='Time', content="Since it is in my power To o'erthrow law and in one self-born hour To plant and o'erwhelm custom.", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note175 = Note(
        title='Autolycus', content="Though I am not naturally honest, I am so sometimes by chance", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note176 = Note(
        title='Ariel', content="Ferdinand, With hair up-staring – then like reeds, not hair – Was the first man that leaped; cried ‘Hell is empty And all the devils are here.’", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note177 = Note(
        title='Trinculo', content="Misery acquaints a man with strange bedfellows.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note178 = Note(
        title='Prospero', content="Our revels now are ended. These our actors, As I foretold you, were all spirits and Are melted into air, into thin air; And, like the baseless fabric of this vision, The cloud-capp'd towers, the gorgeous palaces, The solemn temples, the great globe itself, Yea, all which it inherit, shall dissolve, And, like this insubstantial pageant faded, Leave not a rack behind. We are such stuff As dreams are made on: and our little life Is rounded with a sleep.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note179 = Note(
        title='Miranda', content="O, wonder! How many goodly creatures are there here! How beauteous mankind is! O brave new world, That has such people in't.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note180 = Note(
        title='Prospero', content="As you from crimes would pardoned be, Let your indulgence set me free.", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note181 = Note(
        title='Norfolk', content="Be to yourself As you would to your friend.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note182 = Note(
        title='Norfolk', content="Heat not a furnace for your foe so hot That it do singe yourself.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note183 = Note(
        title='Cardinal Wolsey', content="A load would sink a navy: too much honour.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note184 = Note(
        title='Cardinal Wolsey', content="Love thyself last: cherish those hearts that hate thee: Corruption wins not more than honesty.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note185 = Note(
        title='Griffith', content="Men’s evil manners live in brass, their virtues We write in water.", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note186 = Note(
        title='Three Queens', content="Come all sad and solemn shows, That are quick-eyed Pleasure's foes: We convent naught else but woes. We convent naught else but woes.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note187 = Note(
        title='Third Queen', content="This world's a city full of straying streets, And death's the market-place where each one meets.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note188 = Note(
        title='Arcite', content="Fie, sir. You play the child extremely. ", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note189 = Note(
        title='Hippolyta', content="‘Tis pity love should be so tyrannous.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note190 = Note(
        title='Emilia', content="I am bride-habited, But maiden-hearted.", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())


    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.add(note5)
    db.session.add(note6)
    db.session.add(note7)
    db.session.add(note8)
    db.session.add(note9)
    db.session.add(note10)
    db.session.add(note11)
    db.session.add(note12)
    db.session.add(note13)
    db.session.add(note14)
    db.session.add(note15)
    db.session.add(note16)
    db.session.add(note17)
    db.session.add(note18)
    db.session.add(note19)
    db.session.add(note20)
    db.session.add(note21)
    db.session.add(note22)
    db.session.add(note23)
    db.session.add(note24)
    db.session.add(note25)
    db.session.add(note26)
    db.session.add(note27)
    db.session.add(note28)
    db.session.add(note29)
    db.session.add(note30)
    db.session.add(note31)
    db.session.add(note32)
    db.session.add(note33)
    db.session.add(note34)
    db.session.add(note35)
    db.session.add(note36)
    db.session.add(note37)
    db.session.add(note38)
    db.session.add(note39)
    db.session.add(note40)
    db.session.add(note41)
    db.session.add(note42)
    db.session.add(note43)
    db.session.add(note44)
    db.session.add(note45)
    db.session.add(note46)
    db.session.add(note47)
    db.session.add(note48)
    db.session.add(note49)
    db.session.add(note50)
    db.session.add(note51)
    db.session.add(note52)
    db.session.add(note53)
    db.session.add(note54)
    db.session.add(note55)
    db.session.add(note56)
    db.session.add(note57)
    db.session.add(note58)
    db.session.add(note59)
    db.session.add(note60)
    db.session.add(note61)
    db.session.add(note62)
    db.session.add(note63)
    db.session.add(note64)
    db.session.add(note65)
    db.session.add(note66)
    db.session.add(note67)
    db.session.add(note68)
    db.session.add(note69)
    db.session.add(note70)
    db.session.add(note71)
    db.session.add(note72)
    db.session.add(note73)
    db.session.add(note74)
    db.session.add(note75)
    db.session.add(note76)
    db.session.add(note77)
    db.session.add(note78)
    db.session.add(note79)
    db.session.add(note80)
    db.session.add(note81)
    db.session.add(note82)
    db.session.add(note83)
    db.session.add(note84)
    db.session.add(note85)
    db.session.add(note86)
    db.session.add(note87)
    db.session.add(note88)
    db.session.add(note89)
    db.session.add(note90)
    db.session.add(note91)
    db.session.add(note92)
    db.session.add(note93)
    db.session.add(note94)
    db.session.add(note95)
    db.session.add(note96)
    db.session.add(note97)
    db.session.add(note98)
    db.session.add(note99)
    db.session.add(note100)
    db.session.add(note101)
    db.session.add(note102)
    db.session.add(note103)
    db.session.add(note104)
    db.session.add(note105)
    db.session.add(note106)
    db.session.add(note107)
    db.session.add(note108)
    db.session.add(note109)
    db.session.add(note110)
    db.session.add(note111)
    db.session.add(note112)
    db.session.add(note113)
    db.session.add(note114)
    db.session.add(note115)
    db.session.add(note116)
    db.session.add(note117)
    db.session.add(note118)
    db.session.add(note119)
    db.session.add(note120)
    db.session.add(note121)
    db.session.add(note122)
    db.session.add(note123)
    db.session.add(note124)
    db.session.add(note125)
    db.session.add(note126)
    db.session.add(note127)
    db.session.add(note128)
    db.session.add(note129)
    db.session.add(note130)
    db.session.add(note131)
    db.session.add(note132)
    db.session.add(note133)
    db.session.add(note134)
    db.session.add(note135)
    db.session.add(note136)
    db.session.add(note137)
    db.session.add(note138)
    db.session.add(note139)
    db.session.add(note140)
    db.session.add(note141)
    db.session.add(note142)
    db.session.add(note143)
    db.session.add(note144)
    db.session.add(note145)
    db.session.add(note146)
    db.session.add(note147)
    db.session.add(note148)
    db.session.add(note149)
    db.session.add(note150)
    db.session.add(note151)
    db.session.add(note152)
    db.session.add(note153)
    db.session.add(note154)
    db.session.add(note155)
    db.session.add(note156)
    db.session.add(note157)
    db.session.add(note158)
    db.session.add(note159)
    db.session.add(note160)
    db.session.add(note161)
    db.session.add(note162)
    db.session.add(note163)
    db.session.add(note164)
    db.session.add(note165)
    db.session.add(note166)
    db.session.add(note167)
    db.session.add(note168)
    db.session.add(note169)
    db.session.add(note170)
    db.session.add(note171)
    db.session.add(note172)
    db.session.add(note173)
    db.session.add(note174)
    db.session.add(note175)
    db.session.add(note176)
    db.session.add(note177)
    db.session.add(note178)
    db.session.add(note179)
    db.session.add(note180)
    db.session.add(note181)
    db.session.add(note182)
    db.session.add(note183)
    db.session.add(note184)
    db.session.add(note185)
    db.session.add(note186)
    db.session.add(note187)
    db.session.add(note188)
    db.session.add(note189)
    db.session.add(note190)

    db.session.commit()

    notebook1 = Notebook.query.get(1)
    notebook2 = Notebook.query.get(2)
    notebook3 = Notebook.query.get(3)
    notebook4 = Notebook.query.get(4)
    notebook5 = Notebook.query.get(5)
    notebook6 = Notebook.query.get(6)
    notebook7 = Notebook.query.get(7)
    notebook8 = Notebook.query.get(8)
    notebook9 = Notebook.query.get(9)
    notebook10 = Notebook.query.get(10)
    notebook11 = Notebook.query.get(11)
    notebook12 = Notebook.query.get(12)
    notebook13 = Notebook.query.get(13)
    notebook14 = Notebook.query.get(14)
    notebook15 = Notebook.query.get(15)
    notebook16 = Notebook.query.get(16)
    notebook17 = Notebook.query.get(17)
    notebook18 = Notebook.query.get(18)
    notebook19 = Notebook.query.get(19)
    notebook20 = Notebook.query.get(20)
    notebook21 = Notebook.query.get(21)
    notebook22 = Notebook.query.get(22)
    notebook23 = Notebook.query.get(23)
    notebook24 = Notebook.query.get(24)
    notebook25 = Notebook.query.get(25)
    notebook26 = Notebook.query.get(26)
    notebook27 = Notebook.query.get(27)
    notebook28 = Notebook.query.get(28)
    notebook29 = Notebook.query.get(29)
    notebook30 = Notebook.query.get(30)
    notebook31 = Notebook.query.get(31)
    notebook32 = Notebook.query.get(32)
    notebook33 = Notebook.query.get(33)
    notebook34 = Notebook.query.get(34)
    notebook35 = Notebook.query.get(35)
    notebook36 = Notebook.query.get(36)
    notebook37 = Notebook.query.get(37)
    notebook38 = Notebook.query.get(38)


    note1.notebooks.append(Notebook.query.get(1))
    note2.notebooks.append(Notebook.query.get(1))
    note3.notebooks.append(Notebook.query.get(1))
    note4.notebooks.append(Notebook.query.get(1))
    note5.notebooks.append(Notebook.query.get(1))
    note6.notebooks.append(Notebook.query.get(2))
    note7.notebooks.append(Notebook.query.get(2))
    note8.notebooks.append(Notebook.query.get(2))
    note9.notebooks.append(Notebook.query.get(2))
    note10.notebooks.append(Notebook.query.get(2))
    note11.notebooks.append(Notebook.query.get(3))
    note12.notebooks.append(Notebook.query.get(3))
    note13.notebooks.append(Notebook.query.get(3))
    note14.notebooks.append(Notebook.query.get(3))
    note15.notebooks.append(Notebook.query.get(3))
    note16.notebooks.append(Notebook.query.get(4))
    note17.notebooks.append(Notebook.query.get(4))
    note18.notebooks.append(Notebook.query.get(4))
    note19.notebooks.append(Notebook.query.get(4))
    note20.notebooks.append(Notebook.query.get(4))
    note21.notebooks.append(Notebook.query.get(5))
    note22.notebooks.append(Notebook.query.get(5))
    note23.notebooks.append(Notebook.query.get(5))
    note24.notebooks.append(Notebook.query.get(5))
    note25.notebooks.append(Notebook.query.get(5))
    note26.notebooks.append(Notebook.query.get(6))
    note27.notebooks.append(Notebook.query.get(6))
    note28.notebooks.append(Notebook.query.get(6))
    note29.notebooks.append(Notebook.query.get(6))
    note30.notebooks.append(Notebook.query.get(6))
    note31.notebooks.append(Notebook.query.get(7))
    note32.notebooks.append(Notebook.query.get(7))
    note33.notebooks.append(Notebook.query.get(7))
    note34.notebooks.append(Notebook.query.get(7))
    note35.notebooks.append(Notebook.query.get(7))
    note36.notebooks.append(Notebook.query.get(8))
    note37.notebooks.append(Notebook.query.get(8))
    note38.notebooks.append(Notebook.query.get(8))
    note39.notebooks.append(Notebook.query.get(8))
    note40.notebooks.append(Notebook.query.get(8))
    note41.notebooks.append(Notebook.query.get(9))
    note42.notebooks.append(Notebook.query.get(9))
    note43.notebooks.append(Notebook.query.get(9))
    note44.notebooks.append(Notebook.query.get(9))
    note45.notebooks.append(Notebook.query.get(9))
    note46.notebooks.append(Notebook.query.get(10))
    note47.notebooks.append(Notebook.query.get(10))
    note48.notebooks.append(Notebook.query.get(10))
    note49.notebooks.append(Notebook.query.get(10))
    note50.notebooks.append(Notebook.query.get(10))
    note51.notebooks.append(Notebook.query.get(11))
    note52.notebooks.append(Notebook.query.get(11))
    note53.notebooks.append(Notebook.query.get(11))
    note54.notebooks.append(Notebook.query.get(11))
    note55.notebooks.append(Notebook.query.get(11))
    note56.notebooks.append(Notebook.query.get(12))
    note57.notebooks.append(Notebook.query.get(12))
    note58.notebooks.append(Notebook.query.get(12))
    note59.notebooks.append(Notebook.query.get(12))
    note60.notebooks.append(Notebook.query.get(12))
    note61.notebooks.append(Notebook.query.get(13))
    note62.notebooks.append(Notebook.query.get(13))
    note63.notebooks.append(Notebook.query.get(13))
    note64.notebooks.append(Notebook.query.get(13))
    note65.notebooks.append(Notebook.query.get(13))
    note66.notebooks.append(Notebook.query.get(14))
    note67.notebooks.append(Notebook.query.get(14))
    note68.notebooks.append(Notebook.query.get(14))
    note69.notebooks.append(Notebook.query.get(14))
    note70.notebooks.append(Notebook.query.get(14))
    note71.notebooks.append(Notebook.query.get(15))
    note72.notebooks.append(Notebook.query.get(15))
    note73.notebooks.append(Notebook.query.get(15))
    note74.notebooks.append(Notebook.query.get(15))
    note75.notebooks.append(Notebook.query.get(15))
    note76.notebooks.append(Notebook.query.get(16))
    note77.notebooks.append(Notebook.query.get(16))
    note78.notebooks.append(Notebook.query.get(16))
    note79.notebooks.append(Notebook.query.get(16))
    note80.notebooks.append(Notebook.query.get(16))
    note81.notebooks.append(Notebook.query.get(17))
    note82.notebooks.append(Notebook.query.get(17))
    note83.notebooks.append(Notebook.query.get(17))
    note84.notebooks.append(Notebook.query.get(17))
    note85.notebooks.append(Notebook.query.get(17))
    note86.notebooks.append(Notebook.query.get(18))
    note87.notebooks.append(Notebook.query.get(18))
    note88.notebooks.append(Notebook.query.get(18))
    note89.notebooks.append(Notebook.query.get(18))
    note90.notebooks.append(Notebook.query.get(18))
    note91.notebooks.append(Notebook.query.get(19))
    note92.notebooks.append(Notebook.query.get(19))
    note93.notebooks.append(Notebook.query.get(19))
    note94.notebooks.append(Notebook.query.get(19))
    note95.notebooks.append(Notebook.query.get(19))
    note96.notebooks.append(Notebook.query.get(20))
    note97.notebooks.append(Notebook.query.get(20))
    note98.notebooks.append(Notebook.query.get(20))
    note99.notebooks.append(Notebook.query.get(20))
    note100.notebooks.append(Notebook.query.get(20))
    note101.notebooks.append(Notebook.query.get(21))
    note102.notebooks.append(Notebook.query.get(21))
    note103.notebooks.append(Notebook.query.get(21))
    note104.notebooks.append(Notebook.query.get(21))
    note105.notebooks.append(Notebook.query.get(21))
    note106.notebooks.append(Notebook.query.get(22))
    note107.notebooks.append(Notebook.query.get(22))
    note108.notebooks.append(Notebook.query.get(22))
    note109.notebooks.append(Notebook.query.get(22))
    note110.notebooks.append(Notebook.query.get(22))
    note111.notebooks.append(Notebook.query.get(23))
    note112.notebooks.append(Notebook.query.get(23))
    note113.notebooks.append(Notebook.query.get(23))
    note114.notebooks.append(Notebook.query.get(23))
    note115.notebooks.append(Notebook.query.get(23))
    note116.notebooks.append(Notebook.query.get(24))
    note117.notebooks.append(Notebook.query.get(24))
    note118.notebooks.append(Notebook.query.get(24))
    note119.notebooks.append(Notebook.query.get(24))
    note120.notebooks.append(Notebook.query.get(24))
    note121.notebooks.append(Notebook.query.get(25))
    note122.notebooks.append(Notebook.query.get(25))
    note123.notebooks.append(Notebook.query.get(25))
    note124.notebooks.append(Notebook.query.get(25))
    note125.notebooks.append(Notebook.query.get(25))
    note126.notebooks.append(Notebook.query.get(26))
    note127.notebooks.append(Notebook.query.get(26))
    note128.notebooks.append(Notebook.query.get(26))
    note129.notebooks.append(Notebook.query.get(26))
    note130.notebooks.append(Notebook.query.get(26))
    note131.notebooks.append(Notebook.query.get(27))
    note132.notebooks.append(Notebook.query.get(27))
    note133.notebooks.append(Notebook.query.get(27))
    note134.notebooks.append(Notebook.query.get(27))
    note135.notebooks.append(Notebook.query.get(27))
    note136.notebooks.append(Notebook.query.get(28))
    note137.notebooks.append(Notebook.query.get(28))
    note138.notebooks.append(Notebook.query.get(28))
    note139.notebooks.append(Notebook.query.get(28))
    note140.notebooks.append(Notebook.query.get(28))
    note141.notebooks.append(Notebook.query.get(29))
    note142.notebooks.append(Notebook.query.get(29))
    note143.notebooks.append(Notebook.query.get(29))
    note144.notebooks.append(Notebook.query.get(29))
    note145.notebooks.append(Notebook.query.get(29))
    note146.notebooks.append(Notebook.query.get(30))
    note147.notebooks.append(Notebook.query.get(30))
    note148.notebooks.append(Notebook.query.get(30))
    note149.notebooks.append(Notebook.query.get(30))
    note150.notebooks.append(Notebook.query.get(30))
    note151.notebooks.append(Notebook.query.get(31))
    note152.notebooks.append(Notebook.query.get(31))
    note153.notebooks.append(Notebook.query.get(31))
    note154.notebooks.append(Notebook.query.get(31))
    note155.notebooks.append(Notebook.query.get(31))
    note156.notebooks.append(Notebook.query.get(32))
    note157.notebooks.append(Notebook.query.get(32))
    note158.notebooks.append(Notebook.query.get(32))
    note159.notebooks.append(Notebook.query.get(32))
    note160.notebooks.append(Notebook.query.get(32))
    note161.notebooks.append(Notebook.query.get(33))
    note162.notebooks.append(Notebook.query.get(33))
    note163.notebooks.append(Notebook.query.get(33))
    note164.notebooks.append(Notebook.query.get(33))
    note165.notebooks.append(Notebook.query.get(33))
    note166.notebooks.append(Notebook.query.get(34))
    note167.notebooks.append(Notebook.query.get(34))
    note168.notebooks.append(Notebook.query.get(34))
    note169.notebooks.append(Notebook.query.get(34))
    note170.notebooks.append(Notebook.query.get(34))
    note171.notebooks.append(Notebook.query.get(35))
    note172.notebooks.append(Notebook.query.get(35))
    note173.notebooks.append(Notebook.query.get(35))
    note174.notebooks.append(Notebook.query.get(35))
    note175.notebooks.append(Notebook.query.get(35))
    note176.notebooks.append(Notebook.query.get(36))
    note177.notebooks.append(Notebook.query.get(36))
    note178.notebooks.append(Notebook.query.get(36))
    note179.notebooks.append(Notebook.query.get(36))
    note180.notebooks.append(Notebook.query.get(36))
    note181.notebooks.append(Notebook.query.get(37))
    note182.notebooks.append(Notebook.query.get(37))
    note183.notebooks.append(Notebook.query.get(37))
    note184.notebooks.append(Notebook.query.get(37))
    note185.notebooks.append(Notebook.query.get(37))
    note186.notebooks.append(Notebook.query.get(38))
    note187.notebooks.append(Notebook.query.get(38))
    note188.notebooks.append(Notebook.query.get(38))
    note189.notebooks.append(Notebook.query.get(38))
    note190.notebooks.append(Notebook.query.get(38))

    db.session.commit()

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebook_notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))
        db.session.execute(text("DELETE FROM notebook_notes"))
    db.session.commit()
