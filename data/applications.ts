import { ApplicationItem } from '../types';

export const applications: ApplicationItem[] = [
  {
    id: 'ladder',
    title: 'Narvon Balandligi',
    shortDesc: 'Devorga suyalgan narvonning uzunligini topish.',
    problem: 'Sizda 5 metr balandlikdagi devorga chiqish kerak. Narvon devor ostidan 2 metr uzoqlikda turibdi. Necha metrlik narvon kerak?',
    solution: 'Narvon (gipotenuza), devor (katet) va yer (katet) to\'g\'ri burchakli uchburchak hosil qiladi.',
    formula: 'c = √(a² + b²)',
    icon: '🪜',
    shapeType: 'ladder'
  },
  {
    id: 'phone',
    title: 'Telefon Ekrani',
    shortDesc: 'Ekran diagonali dyuymlarda qanday o\'lchanadi?',
    problem: 'Telefonning bo\'yi 12 sm, eni 7 sm. Uning diagonali necha sm?',
    solution: 'Ekran to\'g\'ri to\'rtburchak bo\'lib, diagonali uni ikkita to\'g\'ri burchakli uchburchakka ajratadi.',
    formula: 'd² = w² + h²',
    icon: '📱',
    shapeType: 'phone'
  },
  {
    id: 'carpet',
    title: 'Gilam To\'g\'ri Burchagi',
    shortDesc: 'Xona burchagi 90 darajami?',
    problem: 'Ustalar xonaning burchagi to\'g\'ri ekanligini tekshirmoqchi. Ular 3m va 4m o\'lchab, diagonalni tekshirishadi.',
    solution: 'Agar tomonlar 3 va 4 bo\'lsa, diagonal 5 bo\'lishi kerak (3-4-5 qoidasi).',
    formula: 'a² + b² = c² (3² + 4² = 5²)',
    icon: '📐',
    shapeType: 'carpet'
  },
  {
    id: 'distance',
    title: 'Ikki Nuqta Oralig\'i',
    shortDesc: 'Xaritadagi eng qisqa masofa.',
    problem: 'A nuqtadan B nuqtaga borish uchun avval 3 km shimolga, keyin 4 km sharqqa yurildi. To\'g\'ri chiziq bo\'yicha masofa qancha?',
    solution: 'Yurilgan yo\'llar katetlar, to\'g\'ri masofa esa gipotenuzadir.',
    formula: 'S = √(x² + y²)',
    icon: '🗺️',
    shapeType: 'map'
  },
  {
    id: 'astronomy',
    title: 'Astronomik Masofa',
    shortDesc: 'Yulduzlargacha bo\'lgan masofa.',
    problem: 'Yerdan turib kosmik kema va sun\'iy yo\'ldosh orasidagi masofani aniqlash.',
    solution: 'Signalning borish va kelish vaqti hamda burchaklar orqali uchburchak hosil qilinadi.',
    formula: 'c² = a² + b²',
    icon: '🔭',
    shapeType: 'cosmos'
  },
  {
    id: 'pixels',
    title: 'Kompyuter Grafikasi',
    shortDesc: 'Piksellar orasidagi masofa.',
    problem: 'Ekranda (10, 20) va (40, 60) koordinatali piksellar orasidagi masofani hisoblash.',
    solution: 'Koordinatalar farqi katetlarni beradi: dx = x2-x1, dy = y2-y1.',
    formula: 'd = √((x₂-x₁)² + (y₂-y₁)²)',
    icon: '💻',
    shapeType: 'grid'
  },
  {
    id: 'field',
    title: 'Sug\'orish Maydoni',
    shortDesc: 'Dalani diagonal bo\'yicha bo\'lish.',
    problem: 'Katta to\'rtburchak maydonga suv quvuri o\'tkazish kerak. Diagonal bo\'ylab eng qisqa yo\'l qancha?',
    solution: 'Maydonning eni va bo\'yi katetlar, quvur esa gipotenuza bo\'ladi.',
    formula: 'L² = a² + b²',
    icon: '🌾',
    shapeType: 'field'
  },
  {
    id: 'height',
    title: 'Sfera Balandligi',
    shortDesc: 'Ufqgacha bo\'lgan masofa.',
    problem: 'Dengizdagi kemadan mayoqqacha bo\'lgan masofani aniqlash orqali mayoq balandligini topish.',
    solution: 'Yer radiusi va ufqqa urinma chiziq to\'g\'ri burchak hosil qiladi.',
    formula: 'R² + d² = (R+h)²',
    icon: '🗼',
    shapeType: 'lighthouse'
  },
  {
    id: 'catapult',
    title: 'Katapulta Traektoriyasi',
    shortDesc: 'Otish masofasi va tezligi.',
    problem: 'Katapulta toshni qanchalik uzoqqa otishini hisoblashda boshlang\'ich tezlik vektorini topish.',
    solution: 'Tezlik vektori gorizontal va vertikal tashkil etuvchilarga (katetlarga) ajratiladi.',
    formula: 'v² = vx² + vy²',
    icon: '🏰',
    shapeType: 'catapult'
  },
  {
    id: '3dprint',
    title: '3D Bosib Chiqarish',
    shortDesc: 'Boshchaning harakati.',
    problem: '3D printer boshi bir nuqtadan ikkinchi nuqtaga (X, Y, Z fazoda) harakatlanmoqda.',
    solution: 'Fazoviy Pifagor teoremasi: 3 ta o\'lcham bo\'yicha masofa hisoblanadi.',
    formula: 'd² = x² + y² + z²',
    icon: '🖨️',
    shapeType: 'printer'
  }
];