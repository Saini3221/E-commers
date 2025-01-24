import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function SalePhone() {
  return (
    <div className="h-screen flex flex-col justify-between">
         <Navbar />
         
         <Footer/>
   </div>
    
  )
}

export default SalePhone




// Steps to push code to a Git repository
// 1. Open your terminal or command prompt.
// 2. Navigate to your project directory.
// 3. Initialize a new Git repository if you haven't already:
//    git init
// 4. Add your files to the staging area:
//    git add .
// 5. Commit your changes:
//    git commit -m "Initial commit"
// 6. Add the remote repository URL:
//    git remote add origin <your-repository-URL>
// 7. Push your changes to the remote repository:
//    git push -u origin master

// To delete the old repository, you can use the following command:
//    rm -rf <old-repository-directory>