const sharedProps={
  breakPoints:{xxl:0.175,xl:0.2,lg:0.25,md:0.5,sm:0.5,xs:0.5},
  getBreakPoints:(screenType)=>{
    switch(screenType){
      case 'xxl':
        return 0.175
      break;
      case 'xl':
        return 0.2
      break;
      case 'lg':
        return 0.25
      break;
      default:
        return 0.5
    }
  },
  isOverMain:false,
  getIsOverMain:(screenType)=>{
    return true
    // const screenType
    // const isLowerThanLg=screenType===||'xxl'
    // switch(screenType){
    //   case
    // }
  }
}

export default sharedProps
