const vocabulary = {
  words: [
    { id: 1, image: "https://api.iconify.design/fluent-emoji:cat.svg", fr: "Chat", en: "Cat", es: "Gato", de: "Katze", it: "Gatto", ja: "ネコ" },
    { id: 2, image: "https://api.iconify.design/fluent-emoji:dog.svg", fr: "Chien", en: "Dog", es: "Perro", de: "Hund", it: "Cane", ja: "イヌ" },
    { id: 3, image: "https://api.iconify.design/fluent-emoji:horse.svg", fr: "Cheval", en: "Horse", es: "Caballo", de: "Pferd", it: "Cavallo", ja: "ウマ" },
    { id: 4, image: "https://api.iconify.design/fluent-emoji:rabbit.svg", fr: "Lapin", en: "Rabbit", es: "Conejo", de: "Kaninchen", it: "Coniglio", ja: "ウサギ" },
    { id: 5, image: "https://api.iconify.design/fluent-emoji:chicken.svg", fr: "Poule", en: "Chicken", es: "Gallina", de: "Huhn", it: "Gallina", ja: "ニワトリ" },
    { id: 6, image: "https://api.iconify.design/fluent-emoji:cow.svg", fr: "Vache", en: "Cow", es: "Vaca", de: "Kuh", it: "Mucca", ja: "ウシ" },
    { id: 7, image: "https://api.iconify.design/fluent-emoji:pig.svg", fr: "Cochon", en: "Pig", es: "Cerdo", de: "Schwein", it: "Maiale", ja: "ブタ" },
    { id: 8, image: "https://api.iconify.design/fluent-emoji:ewe.svg", fr: "Mouton", en: "Sheep", es: "Oveja", de: "Schaf", it: "Pecora", ja: "ヒツジ" },
    { id: 9, image: "https://api.iconify.design/fluent-emoji:bird.svg", fr: "Oiseau", en: "Bird", es: "Pájaro", de: "Vogel", it: "Uccello", ja: "トリ" },
    { id: 10, image: "https://api.iconify.design/fluent-emoji:fish.svg", fr: "Poisson", en: "Fish", es: "Pez", de: "Fisch", it: "Pesce", ja: "サカナ" },
    { id: 11, image: "https://api.iconify.design/fluent-emoji:lion.svg", fr: "Lion", en: "Lion", es: "León", de: "Löwe", it: "Leone", ja: "ライオン" },
    { id: 12, image: "https://api.iconify.design/fluent-emoji:tiger.svg", fr: "Tigre", en: "Tiger", es: "Tigre", de: "Tiger", it: "Tigre", ja: "トラ" },
    { id: 13, image: "https://api.iconify.design/fluent-emoji:elephant.svg", fr: "Éléphant", en: "Elephant", es: "Elefante", de: "Elefant", it: "Elefante", ja: "ゾウ" },
    { id: 14, image: "https://api.iconify.design/fluent-emoji:giraffe.svg", fr: "Girafe", en: "Giraffe", es: "Jirafa", de: "Giraffe", it: "Giraffa", ja: "キリン" },
    { id: 15, image: "https://api.iconify.design/fluent-emoji:monkey.svg", fr: "Singe", en: "Monkey", es: "Mono", de: "Affe", it: "Scimmia", ja: "サル" },
    { id: 16, image: "https://api.iconify.design/fluent-emoji:bear.svg", fr: "Ours", en: "Bear", es: "Oso", de: "Bär", it: "Orso", ja: "クマ" },
    { id: 17, image: "https://api.iconify.design/fluent-emoji:wolf.svg", fr: "Loup", en: "Wolf", es: "Lobo", de: "Wolf", it: "Lupo", ja: "オオカミ" },
    { id: 18, image: "https://api.iconify.design/fluent-emoji:fox.svg", fr: "Renard", en: "Fox", es: "Zorro", de: "Fuchs", it: "Volpe", ja: "キツネ" },
    { id: 19, image: "https://api.iconify.design/fluent-emoji:penguin.svg", fr: "Pingouin", en: "Penguin", es: "Pingüino", de: "Pinguin", it: "Pinguino", ja: "ペンギン" },
    { id: 20, image: "https://api.iconify.design/fluent-emoji:turtle.svg", fr: "Tortue", en: "Turtle", es: "Tortuga", de: "Schildkröte", it: "Tartaruga", ja: "カメ" },
    { id: 21, image: "https://api.iconify.design/fluent-emoji:snake.svg", fr: "Serpent", en: "Snake", es: "Serpiente", de: "Schlange", it: "Serpente", ja: "ヘビ" },
    { id: 22, image: "https://api.iconify.design/fluent-emoji:crocodile.svg", fr: "Crocodile", en: "Crocodile", es: "Cocodrilo", de: "Krokodil", it: "Coccodrillo", ja: "ワニ" },
    { id: 23, image: "https://api.iconify.design/fluent-emoji:kangaroo.svg", fr: "Kangourou", en: "Kangaroo", es: "Canguro", de: "Känguru", it: "Canguro", ja: "カンガルー" },
    { id: 24, image: "https://api.iconify.design/fluent-emoji:hippopotamus.svg", fr: "Hippopotame", en: "Hippopotamus", es: "Hipopótamo", de: "Nilpferd", it: "Ippopotamo", ja: "カバ" },
    { id: 25, image: "https://api.iconify.design/fluent-emoji:rhinoceros.svg", fr: "Rhinocéros", en: "Rhinoceros", es: "Rinoceronte", de: "Nashorn", it: "Rinoceronte", ja: "サイ" },
    { id: 26, image: "https://api.iconify.design/fluent-emoji:parrot.svg", fr: "Perroquet", en: "Parrot", es: "Loro", de: "Papagei", it: "Pappagallo", ja: "オウム" },
    { id: 27, image: "https://api.iconify.design/fluent-emoji:dolphin.svg", fr: "Dauphin", en: "Dolphin", es: "Delfín", de: "Delfin", it: "Delfino", ja: "イルカ" },
    { id: 28, image: "https://api.iconify.design/fluent-emoji:shark.svg", fr: "Requin", en: "Shark", es: "Tiburón", de: "Hai", it: "Squalo", ja: "サメ" },
    { id: 29, image: "https://api.iconify.design/fluent-emoji:owl.svg", fr: "Hibou", en: "Owl", es: "Búho", de: "Eule", it: "Gufo", ja: "フクロウ" },
    { id: 30, image: "https://api.iconify.design/fluent-emoji:zebra.svg", fr: "Zèbre", en: "Zebra", es: "Cebra", de: "Zebra", it: "Zebra", ja: "シマウマ" },
    { id: 31, image: "https://api.iconify.design/fluent-emoji:ant.svg", fr: "Fourmi", en: "Ant", es: "Hormiga", de: "Ameise", it: "Formica", ja: "アリ" },
    { id: 32, image: "https://api.iconify.design/fluent-emoji:badger.svg", fr: "Blaireau", en: "Badger", es: "Tejón", de: "Dachs", it: "Tasso", ja: "アナグマ" },
    { id: 33, image: "https://api.iconify.design/fluent-emoji:bat.svg", fr: "Chauve-souris", en: "Bat", es: "Murciélago", de: "Fledermaus", it: "Pipistrello", ja: "コウモリ" },
    { id: 34, image: "https://api.iconify.design/fluent-emoji:beaver.svg", fr: "Castor", en: "Beaver", es: "Castor", de: "Biber", it: "Castoro", ja: "ビーバー" },
    { id: 35, image: "https://api.iconify.design/fluent-emoji:beetle.svg", fr: "Scarabée", en: "Beetle", es: "Escarabajo", de: "Käfer", it: "Scarabeo", ja: "カブトムシ" },
    { id: 36, image: "https://api.iconify.design/fluent-emoji:bison.svg", fr: "Bison", en: "Bison", es: "Bisonte", de: "Bison", it: "Bisonte", ja: "バイソン" },
    { id: 37, image: "https://api.iconify.design/fluent-emoji:blackbird.svg", fr: "Corbeau", en: "Blackbird", es: "Cuervo", de: "Amsel", it: "Merlo", ja: "クロウタドリ" },
    { id: 38, image: "https://api.iconify.design/fluent-emoji:boar.svg", fr: "Sanglier", en: "Boar", es: "Jabalí", de: "Wildschwein", it: "Cinghiale", ja: "イノシシ" },
    { id: 39, image: "https://api.iconify.design/fluent-emoji:bug.svg", fr: "Chenille", en: "Caterpillar", es: "Oruga", de: "Raupe", it: "Bruco", ja: "イモムシ" },
    { id: 40, image: "https://api.iconify.design/fluent-emoji:butterfly.svg", fr: "Papillon", en: "Butterfly", es: "Mariposa", de: "Schmetterling", it: "Farfalla", ja: "チョウ" },
    { id: 41, image: "https://api.iconify.design/fluent-emoji:camel.svg", fr: "Chameau", en: "Camel", es: "Camello", de: "Kamel", it: "Cammello", ja: "ラクダ" },
    { id: 42, image: "https://api.iconify.design/fluent-emoji:chipmunk.svg", fr: "Écureuil", en: "Chipmunk", es: "Ardilla", de: "Streifenhörnchen", it: "Tamia", ja: "シマリス" },
    { id: 43, image: "https://api.iconify.design/fluent-emoji:cockroach.svg", fr: "Cafard", en: "Cockroach", es: "Cucaracha", de: "Kakerlake", it: "Scarafaggio", ja: "ゴキブリ" },
    { id: 44, image: "https://api.iconify.design/fluent-emoji:cricket.svg", fr: "Criquet", en: "Cricket", es: "Grillo", de: "Grille", it: "Grillo", ja: "コオロギ" },
    { id: 45, image: "https://api.iconify.design/fluent-emoji:deer.svg", fr: "Cerf", en: "Deer", es: "Ciervo", de: "Hirsch", it: "Cervo", ja: "シカ" },
    { id: 46, image: "https://api.iconify.design/fluent-emoji:dodo.svg", fr: "Dodo", en: "Dodo", es: "Dodo", de: "Dodo", it: "Dodo", ja: "ドードー" },
    { id: 47, image: "https://api.iconify.design/fluent-emoji:donkey.svg", fr: "Âne", en: "Donkey", es: "Burro", de: "Esel", it: "Asino", ja: "ロバ" },
    { id: 48, image: "https://api.iconify.design/fluent-emoji:duck.svg", fr: "Canard", en: "Duck", es: "Pato", de: "Ente", it: "Anatra", ja: "アヒル" },
    { id: 49, image: "https://api.iconify.design/fluent-emoji:flamingo.svg", fr: "Flamant rose", en: "Flamingo", es: "Flamenco", de: "Flamingo", it: "Fenicottero", ja: "フラミンゴ" },
    { id: 50, image: "https://api.iconify.design/fluent-emoji:eagle.svg", fr: "Aigle", en: "Eagle", es: "Águila", de: "Adler", it: "Aquila", ja: "ワシ" },
    { id: 51, image: "https://api.iconify.design/fluent-emoji:fly.svg", fr: "Mouche", en: "Fly", es: "Mosca", de: "Fliege", it: "Mosca", ja: "ハエ" },
    { id: 52, image: "https://api.iconify.design/fluent-emoji:frog.svg", fr: "Grenouille", en: "Frog", es: "Rana", de: "Frosch", it: "Rana", ja: "カエル" },
    { id: 53, image: "https://api.iconify.design/fluent-emoji:goat.svg", fr: "Chèvre", en: "Goat", es: "Cabra", de: "Ziege", it: "Capra", ja: "ヤギ" },
    { id: 54, image: "https://api.iconify.design/fluent-emoji:goose.svg", fr: "Oie", en: "Goose", es: "Ganso", de: "Gans", it: "Oca", ja: "ガチョウ" },
    { id: 55, image: "https://api.iconify.design/fluent-emoji:gorilla.svg", fr: "Gorille", en: "Gorilla", es: "Gorila", de: "Gorilla", it: "Gorilla", ja: "ゴリラ" },
    { id: 56, image: "https://api.iconify.design/fluent-emoji:hamster.svg", fr: "Hamster", en: "Hamster", es: "Hámster", de: "Hamster", it: "Criceto", ja: "ハムスター" },
    { id: 57, image: "https://api.iconify.design/fluent-emoji:hatching-chick.svg", fr: "Poussin", en: "Chick", es: "Pollito", de: "Küken", it: "Pulcino", ja: "ヒヨコ" },
    { id: 58, image: "https://api.iconify.design/fluent-emoji:hedgehog.svg", fr: "Hérisson", en: "Hedgehog", es: "Erizo", de: "Igel", it: "Riccio", ja: "ハリネズミ" },
    { id: 59, image: "https://api.iconify.design/fluent-emoji:honeybee.svg", fr: "Abeille", en: "Bee", es: "Abeja", de: "Biene", it: "Ape", ja: "ミツバチ" },
    { id: 60, image: "https://api.iconify.design/fluent-emoji:jellyfish.svg", fr: "Méduse", en: "Jellyfish", es: "Medusa", de: "Qualle", it: "Medusa", ja: "クラゲ" },
    { id: 61, image: "https://api.iconify.design/fluent-emoji:koala.svg", fr: "Koala", en: "Koala", es: "Koala", de: "Koala", it: "Koala", ja: "コアラ" },
    { id: 62, image: "https://api.iconify.design/fluent-emoji:lady-beetle.svg", fr: "Coccinelle", en: "Ladybug", es: "Mariquita", de: "Marienkäfer", it: "Coccinella", ja: "テントウムシ" },
    { id: 63, image: "https://api.iconify.design/fluent-emoji:leopard.svg", fr: "Léopard", en: "Leopard", es: "Leopardo", de: "Leopard", it: "Leopardo", ja: "ヒョウ" },
    { id: 64, image: "https://api.iconify.design/fluent-emoji:lizard.svg", fr: "Lézard", en: "Lizard", es: "Lagarto", de: "Eidechse", it: "Lucertola", ja: "トカゲ" },
    { id: 65, image: "https://api.iconify.design/fluent-emoji:llama.svg", fr: "Lama", en: "Llama", es: "Llama", de: "Lama", it: "Lama", ja: "ラマ" },
    { id: 66, image: "https://api.iconify.design/fluent-emoji:mammoth.svg", fr: "Mammouth", en: "Mammoth", es: "Mamut", de: "Mammut", it: "Mammut", ja: "マンモス" },
    { id: 67, image: "https://api.iconify.design/fluent-emoji:moose.svg", fr: "Élan", en: "Moose", es: "Alce", de: "Elch", it: "Alce", ja: "ヘラジカ" },
    { id: 68, image: "https://api.iconify.design/fluent-emoji:mosquito.svg", fr: "Moustique", en: "Mosquito", es: "Mosquito", de: "Mücke", it: "Zanzara", ja: "カ" },
    { id: 69, image: "https://api.iconify.design/fluent-emoji:octopus.svg", fr: "Pieuvre", en: "Octopus", es: "Pulpo", de: "Oktopus", it: "Polpo", ja: "タコ" },
    { id: 70, image: "https://api.iconify.design/fluent-emoji:orangutan.svg", fr: "Orang-outan", en: "Orangutan", es: "Orangután", de: "Orang-Utan", it: "Orango", ja: "オランウータン" },
    { id: 71, image: "https://api.iconify.design/fluent-emoji:otter.svg", fr: "Loutre", en: "Otter", es: "Nutria", de: "Otter", it: "Lontra", ja: "カワウソ" },
    { id: 72, image: "https://api.iconify.design/fluent-emoji:ox.svg", fr: "Boeuf", en: "Ox", es: "Buey", de: "Ochse", it: "Bue", ja: "オックス" },
    { id: 73, image: "https://api.iconify.design/fluent-emoji:panda.svg", fr: "Panda", en: "Panda", es: "Panda", de: "Panda", it: "Panda", ja: "パンダ" },
    { id: 74, image: "https://api.iconify.design/fluent-emoji:peacock.svg", fr: "Paon", en: "Peacock", es: "Pavo real", de: "Pfau", it: "Pavone", ja: "クジャク" },
    { id: 75, image: "https://api.iconify.design/fluent-emoji:phoenix-bird.svg", fr: "Phénix", en: "Phoenix", es: "Fénix", de: "Phönix", it: "Fenice", ja: "フェニックス" },
    { id: 76, image: "https://api.iconify.design/fluent-emoji:polar-bear.svg", fr: "Ours polaire", en: "Polar bear", es: "Oso polar", de: "Eisbär", it: "Orso polare", ja: "シロクマ" },
    { id: 77, image: "https://api.iconify.design/fluent-emoji:raccoon.svg", fr: "Raton laveur", en: "Raccoon", es: "Mapache", de: "Waschbär", it: "Procione", ja: "アライグマ" },
    { id: 78, image: "https://api.iconify.design/fluent-emoji:mouse.svg", fr: "Souris", en: "Mouse", es: "Ratón", de: "Maus", it: "Topo", ja: "ネズミ" },
    { id: 79, image: "https://api.iconify.design/fluent-emoji:rat.svg", fr: "Rat", en: "Rat", es: "Rata", de: "Ratte", it: "Ratto", ja: "ドブネズミ" },
    { id: 80, image: "https://api.iconify.design/fluent-emoji:rooster.svg", fr: "Coq", en: "Rooster", es: "Gallo", de: "Hahn", it: "Gallo", ja: "オンドリ" },
    { id: 81, image: "https://api.iconify.design/fluent-emoji:sauropod.svg", fr: "Diplodocus", en: "Diplodocus", es: "Diplodocus", de: "Diplodocus", it: "Diplodoco", ja: "ディプロドクス" },
    { id: 82, image: "https://api.iconify.design/fluent-emoji:scorpion.svg", fr: "Scorpion", en: "Scorpion", es: "Escorpión", de: "Skorpion", it: "Scorpione", ja: "サソリ" },
    { id: 83, image: "https://api.iconify.design/fluent-emoji:seal.svg", fr: "Phoque", en: "Seal", es: "Foca", de: "Seehund", it: "Foca", ja: "アザラシ" },
    { id: 84, image: "https://api.iconify.design/fluent-emoji:skunk.svg", fr: "Mouffette", en: "Skunk", es: "Mofeta", de: "Stinktier", it: "Puzzola", ja: "スカンク" },
    { id: 85, image: "https://api.iconify.design/fluent-emoji:sloth.svg", fr: "Paresseux", en: "Sloth", es: "Perezoso", de: "Faultier", it: "Bradipo", ja: "ナマケモノ" },
    { id: 86, image: "https://api.iconify.design/fluent-emoji:snail.svg", fr: "Escargot", en: "Snail", es: "Caracol", de: "Schnecke", it: "Lumaca", ja: "カタツムリ" },
    { id: 87, image: "https://api.iconify.design/fluent-emoji:spider.svg", fr: "Araignée", en: "Spider", es: "Araña", de: "Spinne", it: "Ragno", ja: "クモ" },
    { id: 88, image: "https://api.iconify.design/fluent-emoji:spouting-whale.svg", fr: "Baleine", en: "Whale", es: "Ballena", de: "Wal", it: "Balena", ja: "クジラ" },
    { id: 89, image: "https://api.iconify.design/fluent-emoji:swan.svg", fr: "Cygne", en: "Swan", es: "Cisne", de: "Schwan", it: "Cigno", ja: "ハクチョウ" },
    { id: 90, image: "https://api.iconify.design/fluent-emoji:t-rex.svg", fr: "T-Rex", en: "T-Rex", es: "T-Rex", de: "T-Rex", it: "T-Rex", ja: "ティラノサウルス" },
    { id: 91, image: "https://api.iconify.design/fluent-emoji:turkey.svg", fr: "Dinde", en: "Turkey", es: "Pavo", de: "Truthahn", it: "Tacchino", ja: "シチメンチョウ" },
    { id: 92, image: "https://api.iconify.design/fluent-emoji:two-hump-camel.svg", fr: "Dromadaire", en: "Dromedary", es: "Dromedario", de: "Dromedar", it: "Dromedario", ja: "ラクダ" },
    { id: 93, image: "https://api.iconify.design/fluent-emoji:unicorn.svg", fr: "Licorne", en: "Unicorn", es: "Unicornio", de: "Einhorn", it: "Unicorno", ja: "ユニコーン" },
    { id: 94, image: "https://api.iconify.design/fluent-emoji:water-buffalo.svg", fr: "Buffle", en: "Buffalo", es: "Búfalo", de: "Büffel", it: "Bufalo", ja: "スイギュウ" },
    { id: 95, image: "https://api.iconify.design/fluent-emoji:worm.svg", fr: "Ver de terre", en: "Worm", es: "Gusano", de: "Wurm", it: "Verme", ja: "ミミズ" },
    { id: 96, image: "https://api.iconify.design/fluent-emoji:blowfish.svg", fr: "Poisson-globe", en: "Blowfish", es: "Pez globo", de: "Kugelfisch", it: "Pesce palla", ja: "フグ" },
    { id: 97, image: "https://api.iconify.design/fluent-emoji:tropical-fish.svg", fr: "Poisson tropical", en: "Tropical fish", es: "Pez tropical", de: "Tropenfisch", it: "Pesce tropicale", ja: "熱帯魚" },
    { id: 98, image: "https://api.iconify.design/fluent-emoji:dove.svg", fr: "Colombe", en: "Dove", es: "Paloma", de: "Taube", it: "Colomba", ja: "ハト" },
    { id: 99, image: "https://api.iconify.design/fluent-emoji:dragon.svg", fr: "Dragon", en: "Dragon", es: "Dragón", de: "Drache", it: "Drago", ja: "ドラゴン" },
    { id: 100, image: "https://api.iconify.design/fluent-emoji:poodle.svg", fr: "Caniche", en: "Poodle", es: "Caniche", de: "Pudel", it: "Barboncino", ja: "プードル" },
    { id: 101, image: "https://api.iconify.design/fluent-emoji:guide-dog.svg", fr: "Chien guide", en: "Guide dog", es: "Perro guía", de: "Blindenhund", it: "Cane guida", ja: "盲導犬" },
    { id: 102, image: "https://api.iconify.design/fluent-emoji:service-dog.svg", fr: "Chien d'assistance", en: "Service dog", es: "Perro de asistencia", de: "Assistenzhund", it: "Cane da assistenza", ja: "介助犬" }
  ]
};