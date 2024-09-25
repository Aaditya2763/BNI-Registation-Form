import React from 'react'
import './loader.css'
const Loader = () => {
  return (
<div class="loading">
	<div class="loading__container">
		<div class="loading__ring loading__ring--orange"></div>
		<div class="loading__ring loading__ring--green"></div>
		<div class="loading__ring loading__ring--blue"></div>
	</div>
</div>
  )
}

export default Loader