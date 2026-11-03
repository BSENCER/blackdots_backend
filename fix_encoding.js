const fs = require('fs');

// Read file as binary buffer
const buffer = fs.readFileSync('admin.html');

// Convert to string using latin1 to preserve raw bytes
let content = buffer.toString('latin1');

// Define replacements for corrupted Azerbaijani characters
const replacements = [
    // Tab buttons and headers
    ['Əlav�" Et', 'Əlavə Et'],
    ['Əlaq�" Mesajları', 'Əlaqə Mesajları'],
    ['Veril�"n Suallar', 'Verilən Suallar'],
    ['Xidm�"tl�"r', 'Xidmətlər'],
    ['T�"tbiql�"r', 'Tətbiqlər'],
    ['R�"yl�"r', 'Rəylər'],
    ['T�"r�"fda�xlar', 'Tərəfdaşlar'],
    ['S�"nayel�"r', 'Sənayələr'],
    ['İdar�" Et', 'İdarə Et'],
    ['Müraci�"tl�"r', 'Müraciətlər'],
    ['Gözl�"m�"d�"', 'Gözləmədə'],
    ['N�"z�"rd�"n Keçirildi', 'Nəzərdən Keçirildi'],
    ['R�"dd Edildi', 'Rədd Edildi'],
    ['Xidm�"t', 'Xidmət'],
    ['Əm�"liyyatlar', 'Əməliyyatlar'],
    ['V�"zif�"', 'Vəzifə'],
    ['�~�"h�"r', 'Şəhər'],
    ['Maa�x', 'Maaş'],
    ['T�"l�"b olunan T�"crüb�"', 'Tələb olunan Təcrübə'],
    ['T�"svir', 'Təsvir'],
    ['L�"�xv', 'Ləğv'],
    ['�Szv', 'Üzv'],
    ['�"kil', 'Şəkil'],
    ['Mü�xt�"ri', 'Müştəri'],
    ['S�"naye', 'Sənaye'],
    ['T�"tbiq', 'Tətbiq'],
    ['R�"y', 'Rəy'],
    ['T�"r�"fda�x', 'Tərəfdaş'],
    ['bo�xluq', 'boşluq'],
    ['Redakt�" Et', 'Redaktə Et'],
    ['Redakt�"', 'Redaktə'],
    ['�"lav�" edildi', 'əlavə edildi'],
    ['yenil�"ndi', 'yeniləndi'],
    ['u�xurla', 'uğurla'],
    ['x�"ta', 'xəta'],
    ['x�"tası', 'xətası'],
    ['yükl�"m�"d�"', 'yükləmədə'],
    ['silinm�"d�"', 'silinmədə'],
    ['Silm�" u�xursuz', 'Silmə uğursuz'],
    ['M�"lumat', 'Məlumat'],
    ['Nöqt�"', 'Nöqtə'],
    ['Düym�" M�"tni', 'Düymə Mətni'],
    ['Açıqlama', 'Açıqlama'],
    ['yükl�"nir', 'yüklənir'],
    ['Fazan yükl�"m�"d�"', 'Faza yükləmədə'],
    ['Fazaları yükl�"m�"d�"', 'Fazalar yükləmədə'],
    ['Mesajları yükl�"m�"d�"', 'Mesajlar yükləmədə'],
    ['Sualları yükl�"m�"d�"', 'Suallar yükləmədə'],
    ['Vakansiyalar yükl�"nm�"d�"', 'Vakansiyalar yüklənmədə'],
    ['Silm�"k ist�"yirsiniz', 'Silmək istəyirsiniz'],
    ['ist�"yirsiniz', 'istəyirsiniz'],
    ['Seçilmi�x', 'Seçilmiş'],
    ['Q1sa MYzmun', 'Qısa Məzmun'],
    ['Tam MYzmun', 'Tam Məzmun'],
    ['DYstYklYnir', 'Dəstəklənir'],
    ['^Ykil', 'Şəkil'],
    ['Mü�"llif', 'Müəllif'],
    ['Q�"bul M�"ktubu', 'Qəbul Məktubu'],
    ['T�"crüb�"', 'Təcrübə'],
    ['Müraci�"t', 'Müraciət'],
    ['v�" ', 'və '],
    ['�"', 'ə'],
    ['�x', 'ş'],
    ['�~', 'Ş'],
    // Fix emojis in tab buttons
    ['�x` Metodoloji', '📊 Metodoloji'],
    ['�x� Əlaqə', '📩 Əlaqə'],
    ['� Tez-tez', '❓ Tez-tez'],
    ['�x� Vakansiyalar', '💼 Vakansiyalar'],
    ['�a"️ Xidmətlər', '🛠️ Xidmətlər'],
    ['�x� Komanda', '👥 Komanda'],
    ['�x� Tətbiqlər', '📱 Tətbiqlər'],
    ['� Rəylər', '💬 Rəylər'],
    ['�x�� Tərəfdaşlar', '🤝 Tərəfdaşlar'],
    ['�x�� Sənayələr', '🏭 Sənayələr'],
    ['�x� Blog', '📝 Blog'],
    // Fix FAQ emoji
    ['� ', '❓ '],
    // Remaining fixes
    ['RedaktY', 'Redaktə'],
    ['XYbYrlYr', 'Xəbərlər'],
    ['MYs:', 'Məs:'],
];

// Apply all replacements
for (const [search, replace] of replacements) {
    content = content.split(search).join(replace);
}

// Remove BOM at start if exists
if (content.charCodeAt(0) === 0xFEFF || content.charAt(0) === '\ufeff') {
    content = content.substring(1);
}
// Also check for weird first character
if (content.charAt(0) === '�' || content.charCodeAt(0) > 127) {
    content = content.substring(1);
}

// Write back as UTF-8
fs.writeFileSync('admin.html', content, 'utf8');
console.log('Done! File fixed.');
