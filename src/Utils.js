class Utils {

  static getStatement ( gpa ) { 
    if ( gpa > 4.75 ) 
        return "ممتاز مرتفع";
    else if ( gpa > 4.50 ) 
        return "ممتاز";
    else if ( gpa > 4.00 ) 
        return "جيد جداً مرتفع";
    else if ( gpa > 3.50 ) 
        return "جيد جدأ"; 
    else if ( gpa > 3.00 ) 
        return "جيد مرتفع";
    else if ( gpa > 2.5 )
        return "جيد" ;
    else if ( gpa > 2 ) 
        return "مقبول مرتفع ";
    else 
        return "مقبول" ;
  }

  static getGradePoint ( string ) {
    switch ( string ) {
        case "A+" : 
            return 5.00 ; 
        case "A" :
            return 4.75 ;
        case "B+" :
            return 4.50 ; 
        case "B" :
            return 4.00 ; 
        case "C+" : 
            return 3.50 ; 
        case "C" :
            return 3.00 ; 
        case "D+" :
            return 2.50 ; 
        case "D" :
            return 2.00 ; 
        case "F" :
            return 1.00 ; 
        default:
            return null;
    }
  }

  static getSumPointsAndHours(subjects) {
    let sumHours = 0;
    let sumPoints = 0;
    for (let i = 0; i < subjects.length; i++) {
      if(!subjects[i].checked)
        continue;
      const subjectGrade = parseFloat(Utils.getGradePoint(subjects[i].grade));
      const subjectHours = parseFloat(subjects[i].hours);
      sumHours += subjectHours;
      sumPoints += (subjectGrade * subjectHours);
    }

    return {sumHours, sumPoints};
  }
}

export default Utils;