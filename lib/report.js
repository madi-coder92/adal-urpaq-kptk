const L = {
  ru: {
    fromAnon: "Обучающегося колледжа (анонимно)",
    fromDefault: "Обучающегося КПТК",
    from: "От",
    date: "Дата",
    subject: "Обращение о возможном факте коррупционного правонарушения",
    intro: "Сообщаю о ситуации",
    when: "Когда",
    where: "Где",
    none: "не указано",
    facts: "Описание фактов",
    person: "Лицо, о котором идёт речь (указано только то, что известно точно)",
    evidence: "Имеющиеся подтверждения",
    noEvidence: "нет",
    reqContact: "Прошу провести проверку изложенных фактов и сообщить о принятых мерах по указанному контакту",
    reqNoContact: "Прошу провести проверку изложенных фактов (контакт для ответа не указан)",
    closing: "Сведения изложены добросовестно, на основании личных наблюдений. Домыслы в обращение не включены.",
    locale: "ru-RU",
  },
  kz: {
    fromAnon: "Колледж білім алушысы (анонимді)",
    fromDefault: "КПТК білім алушысы",
    from: "Кімнен",
    date: "Күні",
    subject: "Сыбайлас жемқорлық құқық бұзушылықтың мүмкін фактісі туралы өтініш",
    intro: "Мына жағдай туралы хабарлаймын",
    when: "Қашан",
    where: "Қайда",
    none: "көрсетілмеген",
    facts: "Фактілердің сипаттамасы",
    person: "Қатысты тұлға (тек нақты белгілі мәлімет көрсетілген)",
    evidence: "Растайтын материалдар",
    noEvidence: "жоқ",
    reqContact: "Көрсетілген фактілерді тексеруді және қабылданған шаралар туралы көрсетілген байланыс бойынша хабарлауды сұраймын",
    reqNoContact: "Көрсетілген фактілерді тексеруді сұраймын (жауап үшін байланыс көрсетілмеген)",
    closing: "Мәліметтер жеке бақылау негізінде адал ниетпен берілді. Болжамдар өтінішке енгізілген жоқ.",
    locale: "kk-KZ",
  },
};

export function buildReport(lang, r, form) {
  const x = L[lang];
  const date = new Date().toLocaleDateString(x.locale);
  const hasContact = form.mode === "contact" && form.contact.trim();
  const from = hasContact ? form.contact.trim() : form.mode === "anon" ? x.fromAnon : x.fromDefault;
  const ev = form.evidence.length ? form.evidence.map((i) => r.evidence[i]).join("; ") : x.noEvidence;
  const lines = [
    r.to[form.to],
    `${x.from}: ${from}`,
    `${x.date}: ${date}`,
    "",
    x.subject.toUpperCase(),
    "",
    `${x.intro}: ${r.types[form.type]}.`,
    `${x.when}: ${form.when.trim() || x.none}.`,
    `${x.where}: ${form.where.trim() || x.none}.`,
    "",
    `${x.facts}:`,
    form.what.trim(),
  ];
  if (form.person.trim()) lines.push("", `${x.person}:`, form.person.trim());
  lines.push("", `${x.evidence}: ${ev}.`, "", `${hasContact ? x.reqContact : x.reqNoContact}.`, x.closing);
  return lines.join("\n");
}
