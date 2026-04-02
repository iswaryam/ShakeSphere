export interface Node extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  group: 'play' | 'theme' | 'pop-culture' | 'word' | 'setting' | 'theatre' | 'linguistic' | 'character';
  description: string;
  genre?: 'Comedy' | 'Tragedy' | 'History';
  lat?: number;
  lng?: number;
  icon?: string;
  color?: string;
  synopsis?: string;
  mainCharacters?: string[];
  externalLink?: string;
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
  type?: 'motif' | 'adaptation' | 'origin' | 'influence' | 'etymology' | 'character-overlap';
  reason?: string;
}

export const shakespeareData: { nodes: Node[]; links: Link[] } = {
  nodes: [
    // Layer 1: The Source (Plays)
    { 
      id: 'hamlet', 
      group: 'play', 
      label: 'Hamlet', 
      genre: 'Tragedy', 
      icon: '💀', 
      color: '#2d3748', 
      description: 'The OG "to be or not to be" emo prince.',
      synopsis: 'The Prince of Denmark seeks revenge against his uncle, Claudius, who has murdered Hamlet\'s father in order to seize his throne and marry Hamlet\'s mother.',
      mainCharacters: ['Hamlet', 'Claudius', 'Gertrude', 'Ophelia', 'Polonius', 'Laertes', 'Horatio'],
      externalLink: 'https://www.folger.edu/explore/shakespeares-works/hamlet/'
    },
    { 
      id: 'macbeth', 
      group: 'play', 
      label: 'Macbeth', 
      genre: 'Tragedy', 
      icon: '⚔️', 
      color: '#c53030', 
      description: 'Ambition, witches, and a lot of hand washing.',
      synopsis: 'A brave Scottish general named Macbeth receives a prophecy from a trio of witches that one day he will become King of Scotland. Consumed by ambition and spurred to action by his wife, Macbeth murders King Duncan and takes the Scottish throne for himself.',
      mainCharacters: ['Macbeth', 'Lady Macbeth', 'The Three Witches', 'Banquo', 'Macduff', 'Duncan'],
      externalLink: 'https://www.folger.edu/explore/shakespeares-works/macbeth/'
    },
    { 
      id: 'romeo-juliet', 
      group: 'play', 
      label: 'Romeo & Juliet', 
      genre: 'Tragedy', 
      icon: '❤️', 
      color: '#f56565', 
      description: 'Two teens, one bad plan, and a balcony.',
      synopsis: 'Two young star-crossed lovers whose deaths ultimately reconcile their feuding families.',
      mainCharacters: ['Romeo Montague', 'Juliet Capulet', 'Friar Laurence', 'Mercutio', 'Tybalt', 'The Nurse'],
      externalLink: 'https://www.folger.edu/explore/shakespeares-works/romeo-and-juliet/'
    },
    { 
      id: 'tempest', 
      group: 'play', 
      label: 'The Tempest', 
      genre: 'Comedy', 
      icon: '🌀', 
      color: '#4299e1', 
      description: 'Magic, storms, and a very grumpy Prospero.',
      synopsis: 'Prospero, the rightful Duke of Milan, uses magic to conjure a storm and shipwreck his enemies on a remote island where he lives with his daughter, Miranda.',
      mainCharacters: ['Prospero', 'Miranda', 'Ariel', 'Caliban', 'Ferdinand', 'Alonso', 'Antonio'],
      externalLink: 'https://www.folger.edu/explore/shakespeares-works/the-tempest/'
    },
    { 
      id: 'midsummer', 
      group: 'play', 
      label: "A Midsummer Night's Dream", 
      genre: 'Comedy', 
      icon: '🧚', 
      color: '#48bb78', 
      description: 'Donkey heads and relationship drama in the woods.',
      synopsis: 'The events surrounding the marriage of Theseus, the Duke of Athens, and Hippolyta, the former queen of the Amazons. These include the adventures of four young Athenian lovers and a group of six amateur actors who are controlled and manipulated by the fairies who inhabit the forest.',
      mainCharacters: ['Puck', 'Oberon', 'Titania', 'Hermia', 'Lysander', 'Helena', 'Demetrius', 'Nick Bottom'],
      externalLink: 'https://www.folger.edu/explore/shakespeares-works/a-midsummer-nights-dream/'
    },
    { 
      id: 'taming-shrew', 
      group: 'play', 
      label: 'The Taming of the Shrew', 
      genre: 'Comedy', 
      icon: '🍷', 
      color: '#ed8936', 
      description: 'A problematic battle of the sexes.',
      synopsis: 'The courtship of Petruchio and Katherina, the headstrong, obdurate shrew. Initially, Katherina is an unwilling participant in the relationship; however, Petruchio "tames" her with various psychological torments.',
      mainCharacters: ['Katherina', 'Petruchio', 'Bianca', 'Baptista Minola', 'Lucentio', 'Gremio', 'Hortensio'],
      externalLink: 'https://www.folger.edu/explore/shakespeares-works/the-taming-of-the-shrew/'
    },
    { 
      id: 'king-lear', 
      group: 'play', 
      label: 'King Lear', 
      genre: 'Tragedy', 
      icon: '👑', 
      color: '#b7791f', 
      description: 'A father, three daughters, and a very bad storm.',
      synopsis: 'The aging King Lear decides to step down from the throne and divide his kingdom among his three daughters, Goneril, Regan, and Cordelia, based on their profession of love for him.',
      mainCharacters: ['King Lear', 'Cordelia', 'Goneril', 'Regan', 'Gloucester', 'Edgar', 'Edmund', 'The Fool'],
      externalLink: 'https://www.folger.edu/explore/shakespeares-works/king-lear/'
    },
    { 
      id: 'henry-v', 
      group: 'play', 
      label: 'Henry V', 
      genre: 'History', 
      icon: '🛡️', 
      color: '#3182ce', 
      description: 'The young King of England invades France.',
      synopsis: 'King Henry V of England, having settled into his role as a responsible monarch, decides to lay claim to the French throne. He leads his army into France, culminating in the Battle of Agincourt.',
      mainCharacters: ['Henry V', 'Chorus', 'Duke of Exeter', 'Earl of Westmorland', 'Archbishop of Canterbury', 'Katherine'],
      externalLink: 'https://www.folger.edu/explore/shakespeares-works/henry-v/'
    },
    { 
      id: 'othello', 
      group: 'play', 
      label: 'Othello', 
      genre: 'Tragedy', 
      icon: '🕯️', 
      color: '#2d3748', 
      description: 'Jealousy, lies, and a very important handkerchief.',
      synopsis: 'The Moorish general Othello is manipulated by his ensign Iago into believing that his wife Desdemona is unfaithful, leading to a tragic end.',
      mainCharacters: ['Othello', 'Iago', 'Desdemona', 'Cassio', 'Emilia', 'Roderigo'],
      externalLink: 'https://www.folger.edu/explore/shakespeares-works/othello/'
    },
    { 
      id: 'twelfth-night', 
      group: 'play', 
      label: 'Twelfth Night', 
      genre: 'Comedy', 
      icon: '🍰', 
      color: '#805ad5', 
      description: 'Shipwrecks, disguises, and yellow stockings.',
      synopsis: 'Viola, shipwrecked on the coast of Illyria, disguises herself as a boy named Cesario and enters the service of Duke Orsino, only to fall in love with him while he is in love with Olivia.',
      mainCharacters: ['Viola', 'Orsino', 'Olivia', 'Sebastian', 'Malvolio', 'Sir Toby Belch', 'Maria'],
      externalLink: 'https://www.folger.edu/explore/shakespeares-works/twelfth-night/'
    },

    // Layer 2: The Motifs (Themes)
    { id: 'betrayal', group: 'theme', label: 'Betrayal', icon: '🗡️', color: '#f56565', description: 'Et tu, Brute?' },
    { id: 'magic', group: 'theme', label: 'Magic', icon: '✨', color: '#9f7aea', description: 'Double, double toil and trouble.' },
    { id: 'revenge', group: 'theme', label: 'Revenge', icon: '🩸', color: '#e53e3e', description: 'A dish best served cold, or with a poisoned foil.' },
    { id: 'love', group: 'theme', label: 'Love', icon: '💘', color: '#f687b3', description: 'It is a smoke raised with the fume of sighs.' },
    { id: 'cross-dressing', group: 'theme', label: 'Cross-dressing', icon: '🎭', color: '#ecc94b', description: 'Gender-bending comedy and confusion.' },
    { id: 'supernatural', group: 'theme', label: 'The Supernatural', icon: '👻', color: '#805ad5', description: 'Ghosts, witches, and spirits.' },

    // Layer 3: The Pop Culture Horizon (Adaptations)
    { id: 'lion-king', group: 'pop-culture', label: 'The Lion King', icon: '🦁', color: '#ed64a6', description: 'Hamlet, but with lions and catchy songs.' },
    { id: '10-things', group: 'pop-culture', label: '10 Things I Hate About You', icon: '📓', color: '#ed64a6', description: 'Taming of the Shrew in a 90s high school.' },
    { id: 'west-side-story', group: 'pop-culture', label: 'West Side Story', icon: '💃', color: '#ed64a6', description: 'Romeo & Juliet with finger snapping and dancing.' },
    { id: 'succession', group: 'pop-culture', label: 'Succession', icon: '🚁', color: '#ed64a6', description: 'King Lear meets modern corporate greed.' },
    { id: 'forbidden-planet', group: 'pop-culture', label: 'Forbidden Planet', icon: '🚀', color: '#ed64a6', description: 'The Tempest in space with a robot.' },
    { id: 'ran', group: 'pop-culture', label: 'Ran', icon: '🔥', color: '#ed64a6', description: 'Akira Kurosawa’s epic take on King Lear.' },
    { id: 'throne-of-blood', group: 'pop-culture', label: 'Throne of Blood', icon: '🏯', color: '#ed64a6', description: 'Akira Kurosawa’s transposition of Macbeth to feudal Japan.' },
    { id: 'shakespeare-in-love', group: 'pop-culture', label: 'Shakespeare in Love', icon: '✍️', color: '#ed64a6', description: 'A fictionalized account of the Bard writing Romeo & Juliet.' },
    { id: 'she-s-the-man', group: 'pop-culture', label: "She's the Man", icon: '⚽', color: '#ed64a6', description: 'Twelfth Night set in a modern boarding school.' },
    { id: 'haider', group: 'pop-culture', label: 'Haider', icon: '❄️', color: '#ed64a6', description: 'Vishal Bhardwaj’s Hamlet set in 1990s Kashmir.' },
    { id: 'omkara', group: 'pop-culture', label: 'Omkara', icon: '🔫', color: '#ed64a6', description: 'Vishal Bhardwaj’s Othello set in the underworld of Uttar Pradesh.' },
    { id: 'maqbool', group: 'pop-culture', label: 'Maqbool', icon: '🥘', color: '#ed64a6', description: 'Vishal Bhardwaj’s Macbeth set in the Mumbai underworld.' },
    { id: 'love-story', group: 'pop-culture', label: 'Taylor Swift: Love Story', icon: '🏰', color: '#ed64a6', description: 'The ultimate pop anthem inspired by Romeo & Juliet.' },
    { id: 'modern-music', group: 'pop-culture', label: 'Modern Music', icon: '🎧', color: '#ed64a6', description: 'From Radiohead to Bastille, the Bard lives in our playlists.' },

    // Characters (New Layer)
    { id: 'falstaff', group: 'character', label: 'Falstaff', icon: '🍺', color: '#dd6b20', description: 'The lovable, cowardly, and witty drunkard.' },
    { id: 'hal', group: 'character', label: 'Prince Hal', icon: '🤴', color: '#3182ce', description: 'The rebellious prince who becomes Henry V.' },
    { id: 'macbeth-char', group: 'character', label: 'Macbeth', icon: '🗡️', color: '#742a2a', description: 'The ambitious Scottish general who becomes King.' },
    { id: 'lady-macbeth', group: 'character', label: 'Lady Macbeth', icon: '🩸', color: '#9b2c2c', description: 'Macbeth’s ambitious and manipulative wife.' },
    { id: 'romeo', group: 'character', label: 'Romeo', icon: '🏹', color: '#9b2c2c', description: 'The young Montague who falls in love with Juliet.' },
    { id: 'juliet', group: 'character', label: 'Juliet', icon: '🌹', color: '#ed64a6', description: 'The young Capulet who falls in love with Romeo.' },
    { id: 'prospero', group: 'character', label: 'Prospero', icon: '📜', color: '#2b6cb0', description: 'The rightful Duke of Milan and a powerful sorcerer.' },
    { id: 'ariel', group: 'character', label: 'Ariel', icon: '🌬️', color: '#63b3ed', description: 'A spirit of the air who serves Prospero.' },
    { id: 'hamlet-char', group: 'character', label: 'Hamlet', icon: '💀', color: '#4a5568', description: 'The Prince of Denmark, mourning his father.' },
    { id: 'ophelia', group: 'character', label: 'Ophelia', icon: '💐', color: '#a0aec0', description: 'The daughter of Polonius and Hamlet’s love interest.' },
    { id: 'lear-char', group: 'character', label: 'King Lear', icon: '👑', color: '#744210', description: 'The aging King of Britain who divides his kingdom.' },
    { id: 'cordelia', group: 'character', label: 'Cordelia', icon: '🕊️', color: '#f6e05e', description: 'Lear’s youngest and most loyal daughter.' },
    { id: 'iago', group: 'character', label: 'Iago', icon: '🐍', color: '#2d3748', description: 'One of Shakespeare’s most complex and chilling villains.' },
    { id: 'desdemona', group: 'character', label: 'Desdemona', icon: '🕯️', color: '#a0aec0', description: 'The innocent and tragic wife of Othello.' },
    { id: 'viola', group: 'character', label: 'Viola', icon: '🎭', color: '#805ad5', description: 'The resourceful heroine of Twelfth Night.' },

    // Settings (Geospatial)
    { id: 'verona', group: 'setting', label: 'Verona, Italy', icon: '🇮🇹', color: '#38a169', description: 'Setting of Romeo & Juliet.', lat: 45.4384, lng: 10.9916 },
    { id: 'inverness', group: 'setting', label: 'Inverness, Scotland', icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: '#2b6cb0', description: 'Setting of Macbeth.', lat: 57.4778, lng: -4.2247 },
    { id: 'elsinore', group: 'setting', label: 'Elsinore, Denmark', icon: '🇩🇰', color: '#e53e3e', description: 'Setting of Hamlet.', lat: 56.0361, lng: 12.6136 },
    { id: 'stratford', group: 'setting', label: 'Stratford-upon-Avon', icon: '🏠', color: '#744210', description: 'The Bard’s birthplace.', lat: 52.1917, lng: -1.7083 },
    { id: 'london', group: 'setting', label: 'London, UK', icon: '🇬🇧', color: '#2d3748', description: 'The Globe Theatre and the heart of his career.', lat: 51.5074, lng: -0.1278 },
    { id: 'san-diego', group: 'theatre', label: 'The Old Globe', icon: '🎭', color: '#3182ce', description: 'San Diego’s famous Shakespearean theatre.', lat: 32.7314, lng: -117.1505 },

    // Linguistic Nodes (Words)
    { id: 'swagger', group: 'linguistic', label: 'Swagger', icon: '💅', color: '#805ad5', description: 'Shakespeare was the first to have it. Appears in "A Midsummer Night\'s Dream" and "Henry V".' },
    { id: 'eyeball', group: 'linguistic', label: 'Eyeball', icon: '👁️', color: '#3182ce', description: 'Yes, he invented the word "eyeball". Appears in "The Tempest".' },
    { id: 'assassination', group: 'linguistic', label: 'Assassination', icon: '🔪', color: '#c53030', description: 'First used in "Macbeth".' }
  ],
  links: [
    // Play to Motif
    { source: 'hamlet', target: 'revenge', value: 8, type: 'motif', reason: 'Hamlet seeks to avenge his father’s murder by his uncle Claudius.' },
    { source: 'hamlet', target: 'supernatural', value: 6, type: 'motif', reason: 'The ghost of Hamlet’s father appears to demand revenge.' },
    { source: 'macbeth', target: 'supernatural', value: 10, type: 'motif', reason: 'The Three Witches and the ghost of Banquo drive the plot and Macbeth’s descent into madness.' },
    { source: 'macbeth', target: 'betrayal', value: 9, type: 'motif', reason: 'Macbeth murders King Duncan, his guest and sovereign, violating the laws of hospitality and loyalty.' },
    { source: 'romeo-juliet', target: 'love', value: 10, type: 'motif', reason: 'The ultimate tragedy of star-crossed lovers whose passion defies their families’ ancient grudge.' },
    { source: 'tempest', target: 'magic', value: 9, type: 'motif', reason: 'Prospero uses his magical books and staff to control the island and its inhabitants.' },
    { source: 'tempest', target: 'supernatural', value: 7, type: 'motif', reason: 'Ariel, a spirit of the air, and Caliban, a "moon-calf," are central supernatural figures.' },
    { source: 'king-lear', target: 'betrayal', value: 8, type: 'motif', reason: 'Lear is betrayed by his two eldest daughters, Goneril and Regan, after he divides his kingdom.' },
    { source: 'taming-shrew', target: 'love', value: 4, type: 'motif', reason: 'A complex and controversial portrayal of courtship and marital power dynamics.' },
    { source: 'midsummer', target: 'magic', value: 9, type: 'motif', reason: 'The fairy king Oberon uses a magical flower to create chaos among the lovers.' },
    { source: 'midsummer', target: 'supernatural', value: 8, type: 'motif', reason: 'Puck and the fairy court are the primary drivers of the plot.' },

    // Play to Adaptation
    { source: 'hamlet', target: 'lion-king', value: 10, type: 'adaptation', reason: 'Simba is Hamlet, Scar is Claudius, and Mufasa is the Ghost. The core plot of a prince avenging his father is identical.' },
    { source: 'romeo-juliet', target: 'west-side-story', value: 10, type: 'adaptation', reason: 'The Capulets and Montagues become the Sharks and the Jets in 1950s New York.' },
    { source: 'taming-shrew', target: '10-things', value: 9, type: 'adaptation', reason: 'Kat and Bianca Stratford are modern versions of Katherina and Bianca, set in a 90s high school.' },
    { source: 'tempest', target: 'forbidden-planet', value: 8, type: 'adaptation', reason: 'Prospero becomes Dr. Morbius, and Ariel becomes Robby the Robot in this sci-fi retelling.' },
    { source: 'king-lear', target: 'succession', value: 9, type: 'adaptation', reason: 'Logan Roy is a modern King Lear dividing his media empire among his three power-hungry children.' },
    { source: 'king-lear', target: 'ran', value: 9, type: 'adaptation', reason: 'Lord Hidetora Ichimonji divides his kingdom among his three sons, leading to epic tragedy.' },
    { source: 'macbeth', target: 'throne-of-blood', value: 9, type: 'adaptation', reason: 'Akira Kurosawa’s transposition of Macbeth to feudal Japan.' },
    { source: 'othello', target: 'omkara', value: 10, type: 'adaptation', reason: 'Vishal Bhardwaj’s gritty Indian adaptation of Othello.' },
    { source: 'hamlet', target: 'haider', value: 10, type: 'adaptation', reason: 'A powerful retelling of Hamlet set against the Kashmir conflict.' },
    { source: 'macbeth', target: 'maqbool', value: 10, type: 'adaptation', reason: 'Macbeth reimagined in the Mumbai mafia.' },
    { source: 'twelfth-night', target: 'she-s-the-man', value: 9, type: 'adaptation', reason: 'Viola disguises herself as her brother to play soccer, mirroring the play’s plot.' },
    { source: 'romeo-juliet', target: 'shakespeare-in-love', value: 8, type: 'adaptation', reason: 'The film explores the fictional creation of the play through the Bard’s own romance.' },
    { source: 'romeo-juliet', target: 'love-story', value: 10, type: 'adaptation', reason: 'Taylor Swift’s hit song directly references the balcony scene and the family feud.' },
    { source: 'hamlet', target: 'modern-music', value: 7, type: 'adaptation', reason: 'Radiohead’s "Talk Show Host" and Elton John’s "The King Must Die" draw on Hamlet’s themes.' },
    { source: 'macbeth', target: 'modern-music', value: 6, type: 'adaptation', reason: 'Bastille’s "Lethargy" and other songs reference the play’s themes of fate and ambition.' },
    { source: 'romeo-juliet', target: 'modern-music', value: 8, type: 'adaptation', reason: 'Dire Straits’ "Romeo and Juliet" is a classic rock retelling of the star-crossed lovers.' },
    { source: 'midsummer', target: 'modern-music', value: 5, type: 'adaptation', reason: 'The Beatles and other artists have referenced the play’s dreamlike magic.' },
    { source: 'othello', target: 'betrayal', value: 10, type: 'motif', reason: 'Iago’s betrayal of Othello is the central engine of the tragedy.' },
    { source: 'twelfth-night', target: 'cross-dressing', value: 10, type: 'motif', reason: 'Viola’s disguise as Cesario creates the play’s central comedic confusion.' },

    // Character Overlaps
    { source: 'falstaff', target: 'henry-v', value: 5, type: 'character-overlap', reason: 'Falstaff is a major character in Henry IV, which precedes Henry V.' },
    { source: 'hal', target: 'henry-v', value: 10, type: 'character-overlap', reason: 'Prince Hal matures into the warrior king Henry V.' },
    { source: 'falstaff', target: 'hal', value: 8, type: 'character-overlap', reason: 'They are close companions in the Boar’s Head Tavern.' },
    { source: 'macbeth-char', target: 'macbeth', value: 10, type: 'character-overlap', reason: 'The titular character of the play.' },
    { source: 'lady-macbeth', target: 'macbeth', value: 10, type: 'character-overlap', reason: 'The manipulative wife of the protagonist.' },
    { source: 'macbeth-char', target: 'lady-macbeth', value: 9, type: 'character-overlap', reason: 'Partners in crime and ambition.' },
    { source: 'romeo', target: 'romeo-juliet', value: 10, type: 'character-overlap', reason: 'The male protagonist of the tragedy.' },
    { source: 'juliet', target: 'romeo-juliet', value: 10, type: 'character-overlap', reason: 'The female protagonist of the tragedy.' },
    { source: 'romeo', target: 'juliet', value: 10, type: 'character-overlap', reason: 'Star-crossed lovers from feuding families.' },
    { source: 'prospero', target: 'tempest', value: 10, type: 'character-overlap', reason: 'The central figure and sorcerer of the play.' },
    { source: 'ariel', target: 'tempest', value: 8, type: 'character-overlap', reason: 'The spirit who serves Prospero.' },
    { source: 'prospero', target: 'ariel', value: 7, type: 'character-overlap', reason: 'Master and spirit servant.' },
    { source: 'hamlet-char', target: 'hamlet', value: 10, type: 'character-overlap', reason: 'The Prince of Denmark and protagonist.' },
    { source: 'ophelia', target: 'hamlet', value: 8, type: 'character-overlap', reason: 'The daughter of Polonius and Hamlet’s love interest.' },
    { source: 'hamlet-char', target: 'ophelia', value: 7, type: 'character-overlap', reason: 'A tragic and complicated romance.' },
    { source: 'lear-char', target: 'king-lear', value: 10, type: 'character-overlap', reason: 'The aging king and protagonist.' },
    { source: 'cordelia', target: 'king-lear', value: 9, type: 'character-overlap', reason: 'The loyal daughter who Lear initially rejects.' },
    { source: 'lear-char', target: 'cordelia', value: 8, type: 'character-overlap', reason: 'A father and his most loyal daughter.' },
    { source: 'iago', target: 'othello', value: 10, type: 'character-overlap', reason: 'The villain who destroys Othello from within.' },
    { source: 'desdemona', target: 'othello', value: 10, type: 'character-overlap', reason: 'Othello’s tragic and faithful wife.' },
    { source: 'viola', target: 'twelfth-night', value: 10, type: 'character-overlap', reason: 'The protagonist who navigates Illyria in disguise.' },

    // Play to Setting
    { source: 'romeo-juliet', target: 'verona', value: 4, type: 'origin', reason: 'The play is set in "fair Verona, where we lay our scene."' },
    { source: 'macbeth', target: 'inverness', value: 4, type: 'origin', reason: 'Macbeth’s castle where the murder of Duncan takes place.' },
    { source: 'hamlet', target: 'elsinore', value: 4, type: 'origin', reason: 'The royal castle of Denmark.' },
    { source: 'stratford', target: 'london', value: 6, type: 'influence', reason: 'Shakespeare moved from Stratford to London to find success.' },

    // Etymology
    { source: 'swagger', target: 'midsummer', value: 7, type: 'etymology', reason: 'Puck uses it: "What hempen home-spuns have we swaggering here?"' },
    { source: 'swagger', target: 'henry-v', value: 5, type: 'etymology', reason: 'Used to describe the behavior of soldiers.' },
    { source: 'eyeball', target: 'tempest', value: 8, type: 'etymology', reason: 'Prospero tells Ariel to be "subject to no sight but thine and mine, invisible to every eyeball else."' },
    { source: 'assassination', target: 'macbeth', value: 9, type: 'etymology', reason: 'Macbeth: "If it were done when \'tis done, then \'twere well it were done quickly: if the assassination could trammel up the consequence..."' }
  ]
};
