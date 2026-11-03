const fs = require('fs');

let content = fs.readFileSync('admin.html', 'utf8');

// Order matters: specific phrases first, then single characters
const replacements = [
    // Headers and specific UI elements
    { from: 'âš™ï¸ ', to: '⚙️' },
    { from: 'Metodologiya FazalarÄ±nÄ± Ä°darÉ™ Et', to: 'Metodologiya Fazalarını İdarə Et' },
    { from: 'FazalarÄ± Ä°darï¿½" Et', to: 'Fazaları İdarə Et' },
    { from: 'Æ laqï¿½" MesajlarÄ±', to: 'Əlaqə Mesajları' },
    { from: 'Tez-tez Verilï¿½"n Suallar', to: 'Tez-tez Verilən Suallar' },
    { from: 'AÃ§Ä±q Vakansiyalar', to: 'Açıq Vakansiyalar' },
    { from: 'MÃ¼raciï¿½"tlï¿½"r', to: 'Müraciətlər' },
    { from: 'Xidmï¿½"tlï¿½"r', to: 'Xidmətlər' },
    { from: 'MÃ¼ï¿½xtï¿½"ri Rï¿½"ylï¿½"r', to: 'Müştəri Rəyləri' },
    { from: 'Tï¿½"rï¿½"fdaï¿½xlar vï¿½" MÃ¼ï¿½xtï¿½"rilï¿½"r', to: 'Tərəfdaşlar və Müştərilər' },
    { from: 'Sï¿½"nayelï¿½"r', to: 'Sənayələr' },
    { from: 'Blog YazÄ±larÄ±', to: 'Blog Yazıları' },

    // Tab buttons with Emojis (approximate matches based on corrupted text)
    { from: 'ï¿½x ` Metodoloji', to: '📊 Metodoloji' },
    { from: 'ï¿½x ï¿½ Æ laqï¿½"', to: '📩 Əlaqə' },
    { from: 'ï¿½  Tez-tez', to: '❓ Tez-tez' },
    { from: 'ï¿½x ï¿½ Vakansiyalar', to: '💼 Vakansiyalar' },
    { from: 'ï¿½a"ï¸  Xidmï¿½"tlï¿½"r', to: '🛠️ Xidmətlər' },
    { from: 'ï¿½x ï¿½ Komanda', to: '👥 Komanda' },
    { from: 'ï¿½x ï¿½ Tï¿½"tbiqlï¿½"r', to: '📱 Tətbiqlər' },
    { from: 'ï¿½ Rï¿½"ylï¿½"r', to: '💬 Rəylər' },
    { from: 'ï¿½xï¿½ï¿½ Tï¿½"rï¿½"fdaï¿½xlar', to: '🤝 Tərəfdaşlar' },
    { from: 'ï¿½xï¿½ï¿½ Sï¿½"nayelï¿½"r', to: '🏭 Sənayələr' },
    { from: 'ï¿½x ï¿½ Blog', to: '📝 Blog' },

    // Words
    { from: 'Æ lavï¿½" Et', to: 'Əlavə Et' },
    { from: 'Redaktï¿½" Et', to: 'Redaktə Et' },
    { from: 'Redaktï¿½"', to: 'Redaktə' },
    { from: 'Lï¿½"ï¿½xv', to: 'Ləğv' },
    { from: 'Yadda Saxla', to: 'Yadda Saxla' },
    { from: 'ï¿½Szv', to: 'Üzv' },
    { from: 'ï¿½~ï¿½"kil', to: 'Şəkil' },
    { from: 'ï¿½~ï¿½"hï¿½"r', to: 'Şəhər' },
    { from: 'Vï¿½"zifï¿½"', to: 'Vəzifə' },
    { from: 'Tï¿½"svir', to: 'Təsvir' },
    { from: 'SÄ±ra', to: 'Sıra' },
    { from: 'Baï¿½xlÄ±q', to: 'Başlıq' },
    { from: 'AÃ§Ä±qlama', to: 'Açıqlama' },
    { from: 'NÃ¶qtï¿½"lï¿½"r', to: 'Nöqtələr' },
    { from: 'NÃ¶qtï¿½"', to: 'Nöqtə' },
    { from: 'DÃ¼ymï¿½"', to: 'Düymə' },
    { from: 'Mï¿½"tni', to: 'Mətni' },
    { from: 'Æ mï¿½"liyyatlar', to: 'Əməliyyatlar' },
    { from: 'MÃ¼ï¿½"llif', to: 'Müəllif' },
    { from: 'Qï¿½"bul Mï¿½"ktubu', to: 'Qəbul Məktubu' },
    { from: 'Tï¿½"crÃ¼bï¿½"', to: 'Təcrübə' },
    { from: 'Tï¿½"lï¿½"b olunan', to: 'Tələb olunan' },
    { from: 'MÃ¼qavilï¿½"', to: 'Müqavilə' },
    { from: 'YarÄ±m Vaxt', to: 'Yarım Vaxt' },
    { from: 'Tam Vaxt', to: 'Tam Vaxt' },
    { from: 'SatÄ±ï¿½x', to: 'Satış' },
    { from: 'Maliyyï¿½"', to: 'Maliyyə' },
    { from: 'Ä°nventar', to: 'İnventar' },
    { from: 'Ä°stehsalat', to: 'İstehsalat' },
    { from: 'Digï¿½"r', to: 'Digər' },
    { from: 'XÃ¼susiyyï¿½"tlï¿½"r', to: 'Xüsusiyyətlər' },
    { from: 'Qaimï¿½"lï¿½"rin', to: 'Qaimələrin' },
    { from: 'xï¿½"ta', 'xəta': 'xəta' },
    { from: 'xï¿½"tasÄ±', to: 'xətası' },
    { from: 'yÃ¼klï¿½"nmï¿½"dï¿½"', to: 'yüklənmədə' },
    { from: 'yÃ¼klï¿½"mï¿½"dï¿½"', to: 'yükləmədə' },
    { from: 'tapÄ±lmadÄ±', to: 'tapılmadı' },
    { from: 'dÃ¶ndï¿½"rmï¿½"di', to: 'döndərmədi' },
    { from: 'MÃ¼raciï¿½"t', to: 'Müraciət' },
    { from: 'Tï¿½"rï¿½"fdaï¿½x', to: 'Tərəfdaş' },
    { from: 'MÃ¼ï¿½xtï¿½"ri', to: 'Müştəri' },
    { from: 'ï¿½~irkï¿½"t', to: 'Şirkət' },

    // Status / Alert Strings
    { from: 'â ³ YÃ¼klÉ™nir...', to: '⏳ Yüklənir...' },
    { from: 'â ³ GÃ¶zlï¿½"mï¿½"dï¿½"', to: '⏳ Gözləmədə' },
    { from: 'âœ… HazÄ±rdÄ±r', to: '✅ Hazırdır' },
    { from: 'ï¿½x ï¿½ï¸  Nï¿½"zï¿½"rdï¿½"n KeÃ§irildi', to: '👁️️ Nəzərdən Keçirildi' },
    { from: 'ï¿½R Rï¿½"dd Edildi', to: '❌ Rədd Edildi' },
    { from: 'uï¿½xurla', to: 'uğurla' },
    { from: 'uï¿½xursuz', to: 'uğursuz' },
    { from: 'istï¿½"yirsiniz', to: 'istəyirsiniz' },
    { from: 'silinmï¿½"dï¿½"', to: 'silinmədə' },

    // Characters
    { from: 'Æ ', to: 'Ə' },
    { from: 'ï¿½"', to: 'ə' },
    { from: 'ï¿½x', to: 'ş' },
    { from: 'ï¿½~', to: 'Ş' },
    { from: 'ÅŸ', to: 'ş' },
    { from: 'Ä±', to: 'ı' },
    { from: 'Ã¼', to: 'ü' },
    { from: 'Ã¶', to: 'ö' },
    { from: 'Ã§', to: 'ç' },
    { from: 'É™', to: 'ə' },
    { from: 'ÄŸ', to: 'ğ' },
    { from: 'Ä°', to: 'İ' },
    { from: 'ï¿½a"', to: '🛠️' },
    { from: 'â ³', to: '⏳' },
    { from: 'âœ…', to: '✅' },
    { from: 'ï¿½', to: '' }, // Remove any remaining garbage
];

replacements.forEach(r => {
    if (r.from && r.to !== undefined) {
        content = content.split(r.from).join(r.to);
    }
});

fs.writeFileSync('admin.html', content, 'utf8');
console.log('Fixed');
