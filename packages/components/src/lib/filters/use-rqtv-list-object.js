import React, {useState, useMemo, useRef} from 'react'

const useRqtvListObject = (qObjectHandler, qSelectionHandler, qLayoutHandler, quickSelectionMode=false, _toggle=true) => {

  const {qObject} = qObjectHandler
  const {handleSelections} = qSelectionHandler
  const {qLayout, applyQLayoutPatch} = qLayoutHandler
  const qIsOneAndOnlyOne = qLayout&&qLayout.qListObject.qDimensionInfo.qIsOneAndOnlyOne
  const toggle = qIsOneAndOnlyOne?false:_toggle

  const [isSearching, setIsSearching] = useState()
  const [waitingDataPage, setWaitingDataPage] = useState()
  const currentDataPage = useRef()
  const rqtvListObject=useMemo(()=>{
    return{
    isSearching:isSearching,
    waitingDataPage:waitingDataPage,
    selectValue: async (value, callback) => {
      handleSelections('/qListObjectDef', async() => {
        try{
          await qObject.selectListObjectValues('/qListObjectDef',[value], toggle)
          if(qIsOneAndOnlyOne||quickSelectionMode){
            rqtvListObject.abortListObjectSearch()
          }
          callback&&callback()
        } catch(err) {
          console.log(err)
        }
      }, qIsOneAndOnlyOne||quickSelectionMode )
    },

    getDataPage: async (qDisplayArea) => {
      setWaitingDataPage(true)
      currentDataPage.current=qDisplayArea
      try{
        const qNewDataPage = await qObject.getListObjectData('/qListObjectDef',[qDisplayArea])
        if(qNewDataPage[0].qArea.qTop===currentDataPage.current.qTop){
          applyQLayoutPatch('qLayout/qListObject/qDataPages', qNewDataPage)
        }
      } catch(err){
        console.log(err)
      } finally{
        setWaitingDataPage(false)
      }
    },

    searchListObjectFor : async (string) => {
      try{
        setIsSearching(true)
        await qObject.searchListObjectFor('/qListObjectDef', string)
      } catch(err){
        console.log(err)
        setIsSearching(false)
      }
		},

		acceptListObjectSearch : async () => {
      try{
        setIsSearching(false)
        await qObject.acceptListObjectSearch('/qListObjectDef', true)
      } catch(err){
        console.log(err)
        setIsSearching(true)
      }
		},

		abortListObjectSearch : async () => {
      try{
        setIsSearching(false)
        await qObject.abortListObjectSearch('/qListObjectDef')
      } catch(err){
        console.log(err)
        setIsSearching(true)
      }
		},

		clearSelections : async () => {
      try{
        await qObject.clearSelections('/qListObjectDef')
      } catch(err){
        console.log(err)
      }
		},

		selectPossible : async () => {
			try{
        await qObject.selectListObjectPossible('/qListObjectDef')
      } catch(err){
        console.log(err)
      }
		},

		selectExcluded : async () => {
			try{
        await qObject.selectListObjectExcluded('/qListObjectDef')
      } catch(err){
        console.log(err)
      }
		}
    }
  },[qObject, qLayout, isSearching, waitingDataPage])
  return rqtvListObject
}

export default useRqtvListObject
