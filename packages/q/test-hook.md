## Typedefs

<dl>
<dt><a href="#qObjectHandler">qObjectHandler</a> : <code>object</code></dt>
<dd><p>the object returned by useQObjectReducer</p>
</dd>
<dt><a href="#hook">hook</a> : <code>function</code></dt>
<dd></dd>
</dl>

<a name="useQObjectReducer(qObjectDef) - a hook to create and retrieve a generic object from the qlik engine"></a>

## useQObjectReducer(qObjectDef) - a hook to create and retrieve a generic object from the qlik engine ⇒ [<code>qObjectHandler</code>](#qObjectHandler)
**Kind**: global {hook}  
**Returns**: [<code>qObjectHandler</code>](#qObjectHandler) - Returns the handler of the newly created object  

| Param | Type | Description |
| --- | --- | --- |
| qObjectDef | <code>object</code> | The object that tells to the qlik engine what object you want |

<a name="qObjectHandler"></a>

## qObjectHandler : <code>object</code>
the object returned by useQObjectReducer

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| qLoading | <code>boolean</code> | if true the the handler is still waiting for response from the qlik server |
| qError | <code>boolean</code> | if true there was an error retrieving the qObject from the engine |
| qObject | <code>object</code> | the object returned from the server |
| reloadObject | <code>function</code> | a method to ask the qlik engine to recalculate the qObject |
| shouldUpdate | <code>boolean</code> | a boolean variable which is set to true when the object is recalculated and you should ask the engine fro the layou (e.g. after selections) |
| setShouldUpdate | <code>function</code> | a function to clean up the shouldupdate property after the needed effects have run |

<a name="hook"></a>

## hook : <code>function</code>
**Kind**: global typedef  
