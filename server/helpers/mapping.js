import { knowledgeType, trimed } from '../../components/utils';

export const readVocabularyKnowledge = row => {
    console.log('processing vocabulary: ' + row);
    const items = row.split(',');
    const [
        textbookVersion,
        textbookGrade,
        textbookLevel,
        textbookUnit,
        vocabulary,
        translation,
        length,
        defaultDifficulty,
    ] = items;

    return {
        title: trimed(vocabulary),
        url: `${knowledgeType.VOCABULARY}_${trimed(vocabulary)}`,
        excerpt: trimed(vocabulary),
        type: knowledgeType.VOCABULARY,
        keywords: [trimed(vocabulary), trimed(textbookLevel), trimed(textbookUnit), trimed(textbookVersion), trimed(textbookGrade)],
        difficulty: parseFloat(defaultDifficulty),
        attributes: {
            textbookVersion: trimed(textbookVersion),
            textbookGrade: trimed(textbookGrade),
            textbookLevel: trimed(textbookLevel),
            textbookUnit: trimed(textbookUnit),
            vocabulary: trimed(vocabulary),
            translation: trimed(translation),
            length: parseInt(length),
            defaultDifficulty: parseFloat(defaultDifficulty),
        }
    }
};

export const readStudentInfo = row => {
    console.log('processing student info: ' + row);
    const items = row.split(',');
    const [
        name,
        sex,
        phone,
        qq,
        classNumber,
        grade,
        record
    ] = items;
    // if english record is in right range use it, other wise, default difficulty level to 0.3
    const englishRecord = parseInt(trimed(record));
    let percentage = 0.3;
    if (englishRecord > 0 && englishRecord < 150 ) {
        percentage = englishRecord / 150 * 0.5;
        if (percentage > 0.3) {
            percentage *= 0.8;
        } else if (percentage > 0.4) {
            percentage *= 0.7;
        } else if (percentage > 0.5) {
            percentage *= 0.6;
        }
    }
    
    return {
        name: trimed(name),
        phone: trimed(phone),
        sex: trimed(sex),
        grade: trimed(grade),
        classNumber: trimed(classNumber),
        englishRecord: englishRecord,
        studyInterval: {
            vocabulary: 20
        },
        level: 0,
        trophy: 0,
        qq: trimed(qq),
        difficultyLevel: percentage > 0.3 ? percentage * 0.3 : percentage
    }
};

export const readVocabularyRootKnowledge = row => {
    console.log('processing vocabulary root: ' + row);
    const items = row.split(',');
    const [
        words,
        place,
        translation,
        examples,
        difficulty
    ] = items;
    const roots = trimed(words).split(';');
    return {
        title: trimed(roots[0]),
        url: `${knowledgeType.VOCABULARY_ROOT}_${trimed(roots[0])}`,
        excerpt: trimed(roots[0]),
        type: knowledgeType.VOCABULARY_ROOT,
        keywords: roots,
        difficulty: parseFloat(difficulty),
        attributes: {
            rootType: trimed(place),
            examples: trimed(examples).split(';'),
            translation: trimed(translation),
            length: parseInt(roots[0].length)
        }
    }
}