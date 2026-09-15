export interface AuthResponse {
  vendor: Vendor;
  token:  string;
}

export interface Vendor {
  id:        string;
  name:      string;
  email:     string;
  phone:     string;
  address:   string;
  createdAt: Date;
  updatedAt: Date;
}
