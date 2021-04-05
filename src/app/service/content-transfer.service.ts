import { Injectable } from '@angular/core';
import { BlogPost } from '../models/blog-post';

@Injectable({
  providedIn: 'root'})
export class ContentTransferService{
  constructor(){}
  private data: BlogPost;

  setData(data: BlogPost){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }
}