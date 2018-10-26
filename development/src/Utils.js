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
        default:
            return null;
    }
  }

}

export default Utils;