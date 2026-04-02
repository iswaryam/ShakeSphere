export interface Word {
  term: string;
  definition: string;
  play: string;
  context: string;
  size: number;
}

export const SHAKESPEARE_VOCABULARY: Word[] = [
  // --- WORDS ---
  { term: "Eyeball", definition: "The round part of the eye.", play: "The Tempest", context: "Prospero to Ariel", size: 1.5 },
  { term: "Swagger", definition: "To walk or behave in a very confident and typically arrogant or aggressive way.", play: "A Midsummer Night's Dream", context: "Puck", size: 1.8 },
  { term: "Assassination", definition: "The action of assassinating someone.", play: "Macbeth", context: "Macbeth's soliloquy", size: 1.2 },
  { term: "Pickle", definition: "A difficult situation.", play: "The Tempest", context: "Alonso", size: 1.4 },
  { term: "Bedazzled", definition: "Greatly impressed by outstanding qualities or beauty.", play: "The Taming of the Shrew", context: "Katherina", size: 1.6 },
  { term: "Belongings", definition: "A person's movable possessions.", play: "Measure for Measure", context: "Duke Vincentio", size: 1.3 },
  { term: "Eventful", definition: "Marked by interesting or exciting events.", play: "As You Like It", context: "Jaques", size: 1.4 },
  { term: "Fashionable", definition: "Characteristic of, influenced by, or representing a current popular style.", play: "Troilus and Cressida", context: "Ulysses", size: 1.5 },
  { term: "Inaudible", definition: "Unable to be heard.", play: "All's Well That Ends Well", context: "King of France", size: 1.2 },
  { term: "Manager", definition: "A person responsible for controlling or administering an organization or group of staff.", play: "A Midsummer Night's Dream", context: "Theseus", size: 1.3 },
  { term: "Scuffle", definition: "A short, confused fight or struggle at close quarters.", play: "Antony and Cleopatra", context: "Philo", size: 1.4 },
  { term: "Uncomfortable", definition: "Causing or feeling slight pain or physical discomfort.", play: "Romeo and Juliet", context: "Capulet", size: 1.5 },
  { term: "Vulnerable", definition: "Susceptible to physical or emotional attack or harm.", play: "Macbeth", context: "Macbeth", size: 1.4 },
  { term: "Addiction", definition: "The fact or condition of being addicted to a particular substance or activity.", play: "Othello", context: "Herald", size: 1.3 },
  { term: "Arch-villain", definition: "A principal or extreme villain.", play: "Timon of Athens", context: "Timon", size: 1.6 },
  { term: "Cold-blooded", definition: "Lacking in feeling or conscience; ruthless.", play: "King John", context: "Constance", size: 1.5 },
  { term: "Dawn", definition: "The first appearance of light in the sky before sunrise.", play: "Henry V", context: "Orleans", size: 1.4 },
  { term: "Dwindle", definition: "Diminish gradually in size, amount, or strength.", play: "Macbeth", context: "First Witch", size: 1.5 },
  { term: "Gossip", definition: "Casual or unconstrained conversation or reports about other people.", play: "The Comedy of Errors", context: "Adriana", size: 1.4 },
  { term: "Hobnob", definition: "Mix socially, especially with those of higher social status.", play: "Twelfth Night", context: "Sir Toby Belch", size: 1.7 },
  { term: "Jaded", definition: "Bored or lacking enthusiasm, typically after having had too much of something.", play: "Henry VI Part 2", context: "Captain", size: 1.4 },
  { term: "Lonely", definition: "Sad because one has no friends or company.", play: "Coriolanus", context: "Coriolanus", size: 1.5 },
  { term: "Moonbeam", definition: "A ray of moonlight.", play: "A Midsummer Night's Dream", context: "Titania", size: 1.6 },
  { term: "New-fangled", definition: "Different from what one is used to; objectionably modern.", play: "Love's Labour's Lost", context: "Berowne", size: 1.5 },
  { term: "Puking", definition: "Vomiting.", play: "As You Like It", context: "Jaques", size: 1.8 },
  { term: "Radiance", definition: "Light or heat as emitted or reflected by something.", play: "All's Well That Ends Well", context: "Helena", size: 1.6 },
  { term: "Skim milk", definition: "Milk from which the cream has been removed.", play: "Henry IV Part 1", context: "Hotspur", size: 1.4 },
  { term: "Unreal", definition: "So strange as to appear imaginary; not real.", play: "Macbeth", context: "Macbeth", size: 1.3 },
  { term: "Zany", definition: "Amusingly unconventional and idiosyncratic.", play: "Love's Labour's Lost", context: "Berowne", size: 1.7 },

  // --- PHRASES ---
  { term: "Brave new world", definition: "A new and hopeful period of history or a new social order.", play: "The Tempest", context: "Miranda", size: 1.9 },
  { term: "Break the ice", definition: "To do or say something to relieve tension or get a conversation started.", play: "The Taming of the Shrew", context: "Tranio", size: 1.7 },
  { term: "Dead as a doornail", definition: "Completely dead.", play: "Henry VI Part 2", context: "Jack Cade", size: 1.6 },
  { term: "Faint-hearted", definition: "Lacking courage; timid.", play: "Henry VI Part 1", context: "Alencon", size: 1.5 },
  { term: "In a pickle", definition: "In a difficult or messy situation.", play: "The Tempest", context: "Alonso", size: 1.8 },
  { term: "Wild-goose chase", definition: "A foolish and hopeless search for or pursuit of something unattainable.", play: "Romeo and Juliet", context: "Mercutio", size: 1.9 },
  { term: "The world's mine oyster", definition: "The world is yours for the taking; you can achieve anything.", play: "The Merry Wives of Windsor", context: "Pistol", size: 2.0 },
  { term: "Heart of gold", definition: "A very kind and generous person.", play: "Henry V", context: "Pistol", size: 1.7 },
  { term: "Green-eyed monster", definition: "Jealousy.", play: "Othello", context: "Iago", size: 1.8 },
  { term: "Full circle", definition: "To return to the original position or state.", play: "King Lear", context: "Edmund", size: 1.6 },
  { term: "Good riddance", definition: "An expression of pleasure on being rid of some person or thing.", play: "Troilus and Cressida", context: "Patroclus", size: 1.7 },
  { term: "In a fool's paradise", definition: "A state of happiness based on false hope.", play: "Romeo and Juliet", context: "Nurse", size: 1.8 },
  { term: "Love is blind", definition: "Lovers are unable to see each other's faults.", play: "The Merchant of Venice", context: "Jessica", size: 2.0 },
  { term: "Melted into thin air", definition: "To disappear completely.", play: "The Tempest", context: "Prospero", size: 1.9 },
  { term: "Neither here nor there", definition: "Irrelevant.", play: "Othello", context: "Emilia", size: 1.6 },
  { term: "Off with his head", definition: "A command to execute someone by decapitation.", play: "Richard III", context: "Richard III", size: 1.7 },
  { term: "Own flesh and blood", definition: "A near relative.", play: "The Merchant of Venice", context: "Shylock", size: 1.6 },
  { term: "Star-crossed lovers", definition: "Lovers whose relationship is doomed to fail due to fate.", play: "Romeo and Juliet", context: "Prologue", size: 2.0 },
  { term: "Wear my heart upon my sleeve", definition: "To display one's emotions openly.", play: "Othello", context: "Iago", size: 1.9 },
  { term: "With bated breath", definition: "In great suspense; very anxiously.", play: "The Merchant of Venice", context: "Shylock", size: 1.8 }
];
