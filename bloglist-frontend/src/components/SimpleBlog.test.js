import React from 'react'
import { shallow } from 'enzyme'
import Blog from './SimpleBlog'

describe('<Simpleblog />', () => {
    it('renders title,author,like', () => {
        const blog = {
            title: 'joo joo',
            author: 'make',
            likes: 4
        }

        const blogComponent = shallow(<Blog blog={blog} />)
        const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')
        const likesDiv = blogComponent.find('.likes')


        expect(titleAndAuthorDiv.text()).toContain(blog.title && blog.author)  
        expect(likesDiv.text()).toContain(blog.likes)
        
    })

})