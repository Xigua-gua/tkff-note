//router v4 页面件传参   
   
   方式 一：
         通过params
        1.路由表中      
              <Route path=' /user/:id '   component={User}></Route>
　　　　　　　　　　　
        2.Link处        
            HTML方式
                 <Link to={ ' /user/ ' + ' 2 ' }  activeClassName='active'>XXXX</Link>          　　　　
　　　　　　　　　　　
          JS方式
                this.props.history.push(  '/user/'+'2'  )
　　　　　　　　　　　
        3.user页面       
               通过  this.props.params.id        就可以接受到传递过来的参数（id）
　　　　　　　　　　　
   方式 二：
         通过query
          前提：必须由其他页面跳过来，参数才会被传递过来
　　　     注：不需要配置路由表。路由表中的内容照常：<Route path='/user' component={User}></Route>
        1.Link处      
          HTML方式
            <Link to={{ pathname: ' /user' , query : { day: 'Friday' }}}>
　　　　　　　　　　
          JS方式
            this.props.history.push({ pathname : '/user' ,query : { day: 'Friday'} })
 
        2.user页面     
             this.props.location.query.day
                                
     方式 三：
        通过state
            同query差不多，只是属性不一样，而且state传的参数是加密的，query传的参数是公开的，在地址栏
        1.Link 处      
          HTML方式：
                <Link to={{ pathname : ' /user' , state : { day: 'Friday' }}}> 
                                　　
         JS方式：
            this.props.history.push({ pathname:'/user',state:{day : 'Friday' } })
                              　　  
        2.user页面       
            this.props.location.state.day
            
            
            
//
//
