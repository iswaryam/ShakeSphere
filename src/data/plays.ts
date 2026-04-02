export interface PlaySummary {
  title: string;
  type: 'Comedy' | 'History' | 'Tragedy';
  emoji: string;
  shortSummary: string;
}

export const ALL_PLAYS: PlaySummary[] = [
  // Comedies
  { title: "All's Well That Ends Well", type: 'Comedy', emoji: '💍', shortSummary: "A girl named Helena does everything she can to win the heart of a count!" },
  { title: "As You Like It", type: 'Comedy', emoji: '🌳', shortSummary: "Everyone runs away to a forest, dresses up in disguises, and falls in love!" },
  { title: "The Comedy of Errors", type: 'Comedy', emoji: '👯', shortSummary: "Two sets of identical twins get mixed up in the same city. It's super confusing and funny!" },
  { title: "Love's Labour's Lost", type: 'Comedy', emoji: '📚', shortSummary: "Four friends promise to study and not see any girls, but then they meet four princesses!" },
  { title: "Measure for Measure", type: 'Comedy', emoji: '⚖️', shortSummary: "A story about being fair and what happens when someone tries to make too many rules." },
  { title: "The Merchant of Venice", type: 'Comedy', emoji: '💰', shortSummary: "A story about a very important promise and a clever girl who saves the day in court!" },
  { title: "The Merry Wives of Windsor", type: 'Comedy', emoji: '🧺', shortSummary: "A silly man tries to trick two smart women, but they trick him back instead!" },
  { title: "A Midsummer Night's Dream", type: 'Comedy', emoji: '🧚', shortSummary: "Fairies, magic juice, and a man with a donkey head in a magical forest!" },
  { title: "Much Ado About Nothing", type: 'Comedy', emoji: '🎭', shortSummary: "Two people who say they hate each other are tricked into falling in love!" },
  { title: "Pericles", type: 'Comedy', emoji: '⛵', shortSummary: "A prince goes on a big adventure across the sea and finds his lost family." },
  { title: "The Taming of the Shrew", type: 'Comedy', emoji: '🐱', shortSummary: "A story about two sisters and the funny ways people try to get them to marry." },
  { title: "The Tempest", type: 'Comedy', emoji: '⛈️', shortSummary: "A wizard on a magical island uses a storm to bring his old friends to him." },
  { title: "Twelfth Night", type: 'Comedy', emoji: '🍰', shortSummary: "A girl dresses as a boy after a shipwreck, leading to lots of funny mix-ups!" },
  { title: "Two Gentlemen of Verona", type: 'Comedy', emoji: '🐕', shortSummary: "Two best friends fall in love with the same girl. Also, there's a funny dog!" },
  { title: "The Winter's Tale", type: 'Comedy', emoji: '❄️', shortSummary: "A king gets very jealous, but many years later, everything is fixed by magic!" },

  // Tragedies
  { title: "Romeo and Juliet", type: 'Tragedy', emoji: '❤️', shortSummary: "Two kids from families who fight fall in love. It's a very famous, sad story." },
  { title: "Macbeth", type: 'Tragedy', emoji: '🧙‍♀️', shortSummary: "Witches tell a man he'll be king, and he makes some very bad choices to get there." },
  { title: "Hamlet", type: 'Tragedy', emoji: '💀', shortSummary: "A prince sees a ghost and has to decide what to do about his family's secrets." },
  { title: "Julius Caesar", type: 'Tragedy', emoji: '🏛️', shortSummary: "A famous leader's friends worry he's getting too powerful and make a plan." },
  { title: "King Lear", type: 'Tragedy', emoji: '👑', shortSummary: "An old king gives his kingdom to his daughters, but they aren't very nice to him." },
  { title: "Othello", type: 'Tragedy', emoji: '🕯️', shortSummary: "A brave soldier is tricked by a mean man into thinking his wife doesn't love him." },
  { title: "Antony and Cleopatra", type: 'Tragedy', emoji: '🐍', shortSummary: "A Roman leader and an Egyptian queen fall in love and have big problems." },
  { title: "Coriolanus", type: 'Tragedy', emoji: '🛡️', shortSummary: "A brave soldier is very proud and gets into trouble with the people of Rome." },
  { title: "Titus Andronicus", type: 'Tragedy', emoji: '⚔️', shortSummary: "A very scary story about a Roman general and a queen who are very mean to each other." },
  { title: "Timon of Athens", type: 'Tragedy', emoji: '💎', shortSummary: "A man gives away all his money to his friends, but they won't help him when he's poor." },
  { title: "Troilus and Cressida", type: 'Tragedy', emoji: '🏹', shortSummary: "A story about love and war during the famous Trojan War." },

  // Histories
  { title: "King John", type: 'History', emoji: '🏰', shortSummary: "A story about a king who has to fight to keep his crown." },
  { title: "Richard II", type: 'History', emoji: '📜', shortSummary: "A king who thinks he's very special finds out that being king is hard work." },
  { title: "Henry IV Part 1", type: 'History', emoji: '🍺', shortSummary: "A prince likes to hang out with funny friends instead of learning to be king." },
  { title: "Henry IV Part 2", type: 'History', emoji: '🛌', shortSummary: "The prince has to grow up and say goodbye to his silly friends to help his dad." },
  { title: "Henry V", type: 'History', emoji: '🐎', shortSummary: "The young prince becomes a brave king and leads his army to a big victory!" },
  { title: "Henry VI Part 1", type: 'History', emoji: '🌹', shortSummary: "A story about a young king and a brave girl named Joan of Arc." },
  { title: "Henry VI Part 2", type: 'History', emoji: '🚩', shortSummary: "The king's friends start fighting each other for power." },
  { title: "Henry VI Part 3", type: 'History', emoji: '⚔️', shortSummary: "The big fight for the crown gets even bigger and more serious." },
  { title: "Richard III", type: 'History', emoji: '🐎', shortSummary: "A mean man tries to become king by being very tricky and unkind." },
  { title: "Henry VIII", type: 'History', emoji: '👑', shortSummary: "A story about a famous king who had many wives and changed his country." }
];
