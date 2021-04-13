import React, {FC} from 'react'

const Footer: FC = () => {

    const getYear = new Date().getFullYear()

    return (
        <footer style={{textAlign: 'center', padding: '1rem 0rem'}} >
            Copyright &copy; UnknownLorem {getYear}
        </footer>
    )
}

export default Footer