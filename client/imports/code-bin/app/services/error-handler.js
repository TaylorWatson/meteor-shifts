export default function() {
  console.error("AN ERROR OCCURED IN A TRANSACTION. HAVE SOME ARGS!");
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}