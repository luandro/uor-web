import React from 'react';
import {Link} from 'react-router';
// import Portal from 'react-portal';
// import Menu from './Menu';

const styles = {
	container: {
		width: '100%',
		height: 50,
		background: '#fff',
		boxShadow: '2px 2px 8px #000'
	},
	inner: {
		width: '95%',
		height: '100%',
		margin: '0 auto',
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'space-around',
		textAlign: 'center',
		lineHeight: 3
	},
	item: {
		width: 50,
		height: '100%'
	},
	notification: {
		height: 8,
		width: 8,
		borderRadius: '50%',
		position: 'relative',
		top: -25,
		right: -30
	},
	menuContainer: {
		display: 'flex'
	}
}

export default ({}) => (
	<div style={styles.container}>
		<div style={styles.inner}>
			<Link to="/" style={styles.item}><img src="/icons/grid.svg" height="20"/></Link>
			<Link to="/" style={styles.item}><img src="/icons/pin.svg" height="20"/></Link>
			<Link to="/" style={styles.item}><img src="/icons/agenda.svg" height="20"/></Link>
			<Link to="/" style={styles.item}>
				<img src="/icons/profile.svg" height="20"/>
				{/*<div style={
					Object.assign({}, styles.notification,
						(status === "new-point") ? {background: '#91FAA8'} : {display: 'none'}
					)
				}>
				</div> */}
			</Link>
			{/* <Portal openByClickOn={<img src="/icons/menu.svg" style={{height: 20}}/>}
			 		closeOnEsc={true}
			 		loseOnOutsideClick={true}>
			 	<Menu>
			 		<div style={styles.menuContainer}>
			 			<header style={styles.header}>
			 				<img style={styles.coverImg} src={"https://unsplash.it/300/180?image=156"}/>
			 				<img style={styles.avatarImg} src={"https://unsplash.it/80/80?image=230"}/>
			 			</header>

			 			<Link style={styles.menuItem} to="/">
			 				<div><h3>Informações úteis</h3></div>
			 			</Link>
			 			<Link style={styles.menuItem} to="/">
			 				<div><h3>Lista de guias</h3></div>
			 			</Link>
			 			<Link style={styles.menuItem} to="/">
			 				<div><h3>Cadastrar como guia</h3></div>
			 			</Link>
			 			<Link style={styles.menuItem} to="/">
			 				<div><h3>Criar novo ponto</h3></div>
			 			</Link>
			 			<Link style={styles.menuItem} to="/">
			 				<div><h3>Loja Virtual</h3></div>
			 			</Link>
			 			<Link style={styles.menuItem} to="/">
			 				<div><h3>Fale conosco</h3></div>
			 			</Link>
			 			<footer style={styles.menuFooter}>
			 				<Link to="/">Login</Link>
			 				<Link to="/">
			 					<img src="/icons/profile.svg" />
			 				</Link>
			 			</footer>
			 		</div>
			 	</Menu>
			 </Portal> */}
		</div>
	</div>
)
