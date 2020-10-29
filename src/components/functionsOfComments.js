export const funUpdateStateComments=(comments, newComments, dataDelete)=>{

    let newcommentsLists= [];
    let done=0;
    let i=0;
    let j=0;
    
    comments.forEach(comment=>{
        let idCommentDelete=(dataDelete.length>j)?dataDelete[j].id:0;
        if(idCommentDelete===comment.id){
            j++;
        }else if(i<newComments.length){
            if(comment.id===newComments[i].id){

                newcommentsLists[newcommentsLists.length]=newComments[i];
                i++;

            
            }else{
                while(newComments[i].comment_on<comment.comment_on && done===0 && i<newComments.length){

                    newcommentsLists[newcommentsLists.length]=newComments[i];
                    done=1;

                    if(newComments.length>i+1){
                        i++;
                        done=0;
                    }
                }
                newcommentsLists[newcommentsLists.length]=comment;

            }
        }else{
            newcommentsLists[newcommentsLists.length]=comment;
        }
        
        
        

    
    });

    while(done===0 && i<newComments.length){
        newcommentsLists[newcommentsLists.length]=newComments[i];
        i++;
        
        if(newComments.length<=i){
            done=1;
        }

    }

    return(newcommentsLists);
    
}

export const timeCalculator=(dateNow, time)=>{

    let dateNowUse=new Date();
    let timeComment= new Date(time);

    let ago=dateNowUse-timeComment;
    

    const NOW=5*1000,
        ONESEC=1000,
        ONEMIN=60*1000,
        ONEHOUR=60*60*1000,
        ONEDAY=24*60*60*1000,
        ONEMONTH=30*24*60*60*1000,
        ONEYEAR=24*60*60*1000*365;

    if(ago<NOW){ //One year
        return 'الأن';
    }else if(ago<ONEMIN){
        return `${Math.floor(ago/ONESEC)} ثانية`;
    }else if(ago<ONEHOUR){
        return `${Math.floor(ago/ONEMIN)} دقيقة`;
    }else if(ago<ONEDAY){
        return `${Math.floor(ago/ONEHOUR)} ساعة`;
    }else if(ago<ONEMONTH){
        return `${Math.floor(ago/ONEDAY)} يوم`;
    }else if(ago<ONEYEAR){
        let month=ago/ONEMONTH;
        let rest=ago-(month*ONEMONTH);
        return `${Math.floor(month)} شهر ${(rest>ONEDAY)?' و '+Math.floor(rest/ONEDAY)+' يوم':''}`;
    }else{
        let year=ago/ONEYEAR;
        let rest=ago-(year*ONEYEAR);
        return `${Math.floor(year)} سنة ${(rest>ONEMONTH)?' و '+Math.floor(rest/ONEMONTH)+' شهر':''}`;
    }

}

export const newCommentsCaseReverse=(allComments)=>{


    let baseComments=[];
    let secComments=[];
    
    baseComments=allComments.filter(el=> el.comment_on===el.comment_id);
    baseComments.reverse();

    secComments=allComments.filter(el=> el.comment_on!==el.comment_id);

    let toReturn=[];

    baseComments.forEach((comment)=>{
        
        let filter=secComments.filter((newComment)=>newComment.comment_on===comment.comment_id);

        if(filter.length>0){
            toReturn=[...toReturn, comment, ...filter];
        }else{
            toReturn.push(comment);
        }

    });

    return toReturn;
}