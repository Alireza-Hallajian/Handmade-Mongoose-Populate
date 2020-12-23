//******************************************************************************** */
//                                hand-made mongoose populate
//******************************************************************************** */

async function MyPopulate(doc, from_indent, from_field, to_field, ref, res)
{
    let fetched_docs = [];
    let doc_from_field;     // contains the source field to populate for


    // if the source field (to populate for) has an indent
    if (from_indent) {
        doc_from_field = doc[from_indent][from_field];
    } 
    else {
        doc_from_field = doc[from_field];
    }


    // population
    for (let i = 0, len = doc_from_field.length; i < len; i++)
    {
        try
        {
            // find the target data to fetch
            let fetched_doc = await ref.findOne({ [to_field]: doc_from_field[i] }, (err) => { if (err) throw err; }).lean();
            fetched_docs.push(fetched_doc);
        }

        catch(err) {
            console.log(colors.bgRed("\nSomething went wrong in 'MyPopulate' function.\n"));
            console.log("\n" + colors.bgBlack.brightRed(err) + "\n");
            return res.status(500).send("Something went wrong!");
        }
    }

    // if there is any fetched doc
    if (fetched_docs.length > 0) 
    {
        //****************************************************************** */
        //                replace fetched data to source field
        //****************************************************************** */

        // if the source field (to populate for) has an indent
        if (from_indent) {
            doc[from_indent][from_field] = fetched_docs;
        } 
        else {
            doc[from_field] = fetched_docs;
        }

        return doc;
    }

    else return false;
}
